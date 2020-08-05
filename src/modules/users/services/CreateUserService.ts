import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ConnectToNetwork from '@shared/infra/Fabric/ConnectToNetwork';
import IMetricsRepository from '@modules/metrics/repositories/IMetricsRepository';
import IResponseTransaction from '@shared/dtos/IResponseTransaction';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  CPF: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MetricsRepository')
    private metricsRepository: IMetricsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    CPF,
    name,
    email,
    password,
  }: IRequest): Promise<User> {
    const checkUserEmailExists = await this.usersRepository.findByEmail(email);
    const checkUserCPFExists = await this.usersRepository.findByCPF(CPF);

    if (checkUserEmailExists) {
      throw new AppError('Email address already used!');
    }

    if (checkUserCPFExists) {
      throw new AppError('CPF address already used!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      CPF,
      name,
      email,
      password: hashedPassword,
    });

    const connectToNetwork = new ConnectToNetwork();

    try {
      const networkObj = await connectToNetwork.execute();
      const args = [CPF];
      const responseTransaction = await networkObj.contract.submitTransaction(
        'createHealthPacientes',
        ...args,
      );

      const { transactionExecutionTime }: IResponseTransaction = JSON.parse(
        responseTransaction.toString(),
      );

      try {
        const user_id = user.id;
        await this.metricsRepository.create({
          user_id,
          transaction_name: 'Criar usuário',
          transaction_time: `${transactionExecutionTime} ms`,
          observation: 'Transação na blockchain',
        });
      } catch (error) {
        throw new AppError('Erro ao salvar dados de métricas de desempenho!');
      }
    } catch (error) {
      throw new AppError(error);
    }

    return user;
  }
}

export default CreateUserService;

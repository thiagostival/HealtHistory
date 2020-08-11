import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ConnectToNetwork from '@shared/infra/Fabric/ConnectToNetwork';
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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    CPF,
    name,
    email,
    password,
  }: IRequest): Promise<{ time: number; user: User }> {
    const checkUserEmailExists = await this.usersRepository.findByEmail(email);
    const checkUserCPFExists = await this.usersRepository.findByCPF(CPF);
    let time = 0;

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
      time = transactionExecutionTime;
    } catch (error) {
      throw new AppError(error);
    }

    return { time, user };
  }
}

export default CreateUserService;

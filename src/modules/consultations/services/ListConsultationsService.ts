import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ConnectToNetwork from '@shared/infra/Fabric/ConnectToNetwork';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

interface IResponse {
  data: string;
  especialidade: string;
  medico: string;
  observation: string;
}

interface IResponseTransaction {
  asset: {
    consultas: IResponse[];
  };
  transactionExecutionTime: number;
}

@injectable()
class ListConsultationsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<{
    observation: string;
    time: number;
    consultations: IResponse[];
  } | null> {
    const cacheKey = `Consultations pacient: ${user_id}`;

    const cacheExecutionTimeBefore = Date.now();
    let consultations = await this.cacheProvider.recover<IResponse[]>(cacheKey);
    const cacheExecutionTimeAfter = Date.now();

    let time = 0;
    let observation = '';

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Erro ao buscar usuário. Tente novamente!');
    }

    if (!consultations) {
      const connectToNetwork = new ConnectToNetwork();
      try {
        const networkObj = await connectToNetwork.execute();
        const args = [user.CPF];
        const responseTransaction = await networkObj.contract.evaluateTransaction(
          'readHealthPacientes',
          ...args,
        );

        const {
          asset,
          transactionExecutionTime,
        }: IResponseTransaction = JSON.parse(responseTransaction.toString());

        observation = 'Transação na Blockchain';
        time = transactionExecutionTime;
        consultations = asset.consultas;

        await this.cacheProvider.save(cacheKey, consultations);
      } catch (error) {
        throw new AppError(error);
      }
    } else {
      time = cacheExecutionTimeAfter - cacheExecutionTimeBefore;
      observation = 'Busca no cache';
    }

    return { observation, time, consultations };
  }
}

export default ListConsultationsService;

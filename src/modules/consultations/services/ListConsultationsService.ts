import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ConnectToNetwork from '@shared/infra/Fabric/ConnectToNetwork';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMetricsRepository from '@modules/metrics/repositories/IMetricsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

interface IResponse {
  asset: {
    consultas: [
      {
        data: string;
        especialidade: string;
        medico: string;
      },
    ];
  };
}

interface IResponseTransaction {
  asset: IResponse[];
  transactionExecutionTime: number;
}

@injectable()
class ListConsultationsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MetricsRepository')
    private metricsRepository: IMetricsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IResponse[] | null> {
    const cacheKey = `Consultations pacient: ${user_id}`;

    const cacheExecutionTimeBefore = Date.now();
    let consultations = await this.cacheProvider.recover<IResponse[]>(cacheKey);
    const cacheExecutionTimeAfter = Date.now();

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

        try {
          await this.metricsRepository.create({
            user_id,
            transaction_name: 'Histórico de consultas',
            transaction_time: `${transactionExecutionTime} ms`,
            observation: 'Transação na blockchain',
          });
        } catch (error) {
          throw new AppError('Erro ao salvar dados de métricas de desempenho!');
        }

        consultations = asset;

        await this.cacheProvider.save(cacheKey, consultations);
      } catch (error) {
        throw new AppError(error);
      }
    } else {
      try {
        await this.metricsRepository.create({
          user_id,
          transaction_name: 'Histórico de consultas',
          transaction_time: `${
            cacheExecutionTimeAfter - cacheExecutionTimeBefore
          } ms`,
          observation:
            'Busca no cache. Só é feito busca na blockchain, caso insira novos dados!',
        });
      } catch (error) {
        throw new AppError('Erro ao salvar dados de métricas de desempenho!');
      }
    }

    return consultations;
  }
}

export default ListConsultationsService;

import { format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ConnectToNetwork from '@shared/infra/Fabric/ConnectToNetwork';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IResponseTransaction from '@shared/dtos/IResponseTransaction';

interface IRequestDTO {
  user_id: string;
  medico: string;
  especialidade: string;
  data: Date;
  observation: string;
}

@injectable()
class CreateConsultationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    medico,
    especialidade,
    data,
    observation,
  }: IRequestDTO): Promise<{ time: number; message: string }> {
    const connectToNetwork = new ConnectToNetwork();

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Erro ao buscar usuário. Tente novamente!');
    }

    try {
      const networkObj = await connectToNetwork.execute();

      const dateFormatted = format(data, "dd/MM/yyyy 'às' HH:mm:ss'h'");
      const date = dateFormatted.toString();
      const args = [user.CPF, medico, especialidade, date, observation];

      const responseTransaction = await networkObj.contract.submitTransaction(
        'updateHealthPacientes',
        ...args,
      );

      const { transactionExecutionTime }: IResponseTransaction = JSON.parse(
        responseTransaction.toString(),
      );

      await this.cacheProvider.invalidate(`Consultations pacient: ${user_id}`);

      return {
        time: transactionExecutionTime,
        message: 'Sucesso no cadastro!',
      };
    } catch (error) {
      throw new AppError('Erro na inserção da Consulta. Tente Novamente!');
    }
  }
}

export default CreateConsultationService;

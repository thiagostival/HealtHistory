import { format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ConnectToNetwork from '@shared/infra/Fabric/ConnectToNetwork';

interface IRequestDTO {
  user_id: string;
  medico: string;
  especialidade: string;
  data: Date;
}

@injectable()
class CreateAppointmentService {
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
  }: IRequestDTO): Promise<string> {
    const connectToNetwork = new ConnectToNetwork();
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Erro ao buscar usuário. Tente novamente!');
    }

    try {
      const networkObj = await connectToNetwork.execute();

      const dateFormatted = format(data, "dd/MM/yyyy 'às' HH:mm'h'");
      const date = dateFormatted.toString();
      const args = [user.CPF, medico, especialidade, date];

      await networkObj.contract.submitTransaction(
        'updateHealthPacientes',
        ...args,
      );

      await this.cacheProvider.invalidate(`Consultations pacient: ${user_id}`);

      return 'Sucesso no cadastro!';
    } catch (error) {
      throw new AppError('Erro na inserção da Consulta. Tente Novamente!');
    }
  }
}

export default CreateAppointmentService;

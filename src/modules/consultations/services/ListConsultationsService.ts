import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ConnectToNetwork from '@shared/infra/Fabric/ConnectToNetwork';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ListConsultationsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<[] | null> {
    const cacheKey = `Consultations pacient: ${user_id}`;
    let consultations = await this.cacheProvider.recover<[]>(cacheKey);

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Erro ao buscar usuário. Tente novamente!');
    }

    if (!consultations) {
      const connectToNetwork = new ConnectToNetwork();
      try {
        const networkObj = await connectToNetwork.execute();
        const args = [user.CPF];
        const response = await networkObj.contract.evaluateTransaction(
          'readHealthPacientes',
          ...args,
        );
        consultations = JSON.parse(response.toString());

        await this.cacheProvider.save(cacheKey, consultations);
      } catch (error) {
        throw new AppError(error);
      }
    }

    return consultations;
  }
}

export default ListConsultationsService;

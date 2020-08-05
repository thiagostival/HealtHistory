import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ConnectToNetwork from '@shared/infra/Fabric/ConnectToNetwork';
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
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used!');
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
      const response = await networkObj.contract.submitTransaction(
        'createHealthPacientes',
        ...args,
      );

      console.log(response.toString());
    } catch (error) {
      throw new AppError(error);
    }

    return user;
  }
}

export default CreateUserService;

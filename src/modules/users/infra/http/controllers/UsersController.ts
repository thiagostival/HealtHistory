import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMetricsUserService from '@modules/metrics/services/CreateMetricsUserService';
import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { CPF, name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const timeExecutionBefore = Date.now();
    const user = await createUser.execute({
      CPF,
      name,
      email,
      password,
    });
    const timeExecution = Date.now() - timeExecutionBefore;

    const createMetric = container.resolve(CreateMetricsUserService);
    await createMetric.execute({
      user_id: user.user.id,
      transaction_name: 'Criar usuário',
      transaction_time: user.time,
      time_total: timeExecution,
      observation: 'Transação na blockchain',
    });

    return response.json(classToClass(user.user));
  }
}

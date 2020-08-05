import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowMetricsUserService from '@modules/metrics/services/ShowMetricsUserService';

export default class MetricsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showMetricsUserService = container.resolve(ShowMetricsUserService);

    const metrics = await showMetricsUserService.execute(user_id);

    return response.json(classToClass(metrics));
  }
}

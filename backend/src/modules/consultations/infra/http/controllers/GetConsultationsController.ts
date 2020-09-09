import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListConsultationsService from '@modules/consultations/services/ListConsultationsService';
import CreateMetricsUserService from '@modules/metrics/services/CreateMetricsUserService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listConsultations = container.resolve(ListConsultationsService);

    const timeExecutionBefore = Date.now();
    const consultations = await listConsultations.execute({
      user_id,
    });
    const timeExecution = Date.now() - timeExecutionBefore;

    if (!consultations) {
      return response.json('Erro na listagem');
    }

    const createMetric = container.resolve(CreateMetricsUserService);
    await createMetric.execute({
      user_id,
      transaction_name: 'Histórico de consultas',
      transaction_time: consultations.time,
      time_total: timeExecution,
      observation: consultations.observation,
    });

    return response.json(consultations.consultations);
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateConsultationService from '@modules/consultations/services/CreateConsultationService';
import CreateMetricsUserService from '@modules/metrics/services/CreateMetricsUserService';

export default class ConsultationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { medico, especialidade, data, observation } = request.body;

    const createConsultation = container.resolve(CreateConsultationService);

    const timeExecutionBefore = Date.now();
    const consultation = await createConsultation.execute({
      user_id,
      medico,
      especialidade,
      data,
      observation,
    });
    const timeExecution = Date.now() - timeExecutionBefore;

    const createMetric = container.resolve(CreateMetricsUserService);
    await createMetric.execute({
      user_id,
      transaction_name: 'Adicionar Consulta',
      transaction_time: consultation.time,
      time_total: timeExecution,
      observation: 'Transação na Blockchain',
    });

    return response.json(consultation.message);
  }
}

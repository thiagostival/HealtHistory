import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateConsultationService from '@modules/consultations/services/CreateConsultationService';

export default class ConsultationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { medico, especialidade, data } = request.body;

    const createConsultation = container.resolve(CreateConsultationService);

    const consultation = await createConsultation.execute({
      user_id,
      medico,
      especialidade,
      data,
    });

    return response.json(consultation);
  }
}

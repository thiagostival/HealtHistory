import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListConsultationsService from '@modules/consultations/services/ListConsultationsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listConsultations = container.resolve(ListConsultationsService);

    const consultations = await listConsultations.execute({
      user_id,
    });

    return response.json(consultations);
  }
}

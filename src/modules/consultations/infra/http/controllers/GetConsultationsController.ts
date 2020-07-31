import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListConsultationsService from '@modules/consultations/services/ListConsultationsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listConsultations = container.resolve(ListConsultationsService);

    const appointments = await listConsultations.execute({
      user_id,
    });

    return response.json(classToClass(appointments));
  }
}

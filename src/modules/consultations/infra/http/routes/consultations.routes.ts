import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ConsultationsController from '../controllers/ConsultationsController';
import GetConsultationsController from '../controllers/GetConsultationsController';

const consultationsRouter = Router();
const consultationsController = new ConsultationsController();
const getConsultationsController = new GetConsultationsController();

consultationsRouter.use(ensureAuthenticated);

consultationsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      medico: Joi.string().required(),
      especialidade: Joi.string().required(),
      data: Joi.date().required(),
    },
  }),
  consultationsController.create,
);

consultationsRouter.get('/', getConsultationsController.index);

export default consultationsRouter;

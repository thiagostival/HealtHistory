import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MetricsController from '../controllers/MetricsController';

const metricsRouter = Router();
const metricsController = new MetricsController();

metricsRouter.use(ensureAuthenticated);

metricsRouter.get('/', metricsController.index);

export default metricsRouter;

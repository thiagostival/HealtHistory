import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import consultationRouter from '@modules/consultations/infra/http/routes/consultations.routes';
import metricsRouter from '@modules/metrics/infra/http/routes/metrics.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/consultations', consultationRouter);
routes.use('/metrics', metricsRouter);

export default routes;

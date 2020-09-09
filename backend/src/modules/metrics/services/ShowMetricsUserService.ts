import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMetricsRepository from '@modules/metrics/repositories/IMetricsRepository';
import Metrics from '../infra/typeorm/entities/Metrics';

@injectable()
class ShowMetricsUserService {
  constructor(
    @inject('MetricsRepository')
    private metricsRepository: IMetricsRepository,
  ) {}

  public async execute(user_id: string): Promise<Metrics[]> {
    try {
      const metrics = await this.metricsRepository.findByUserId(user_id);

      return metrics;
    } catch (error) {
      throw new AppError(
        'Erro ao buscar métricas de desempenho. Tente novamente!',
      );
    }
  }
}

export default ShowMetricsUserService;

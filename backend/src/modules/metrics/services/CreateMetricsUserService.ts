import { injectable, inject } from 'tsyringe';

import IMetricsRepository from '@modules/metrics/repositories/IMetricsRepository';

interface IRequest {
  user_id: string;
  transaction_name: string;
  transaction_time: number;
  time_total: number;
  observation: string;
}

@injectable()
class ShowMetricsUserService {
  constructor(
    @inject('MetricsRepository')
    private metricsRepository: IMetricsRepository,
  ) {}

  public async execute({
    user_id,
    transaction_name,
    transaction_time,
    time_total,
    observation,
  }: IRequest): Promise<void> {
    await this.metricsRepository.create({
      user_id,
      transaction_name,
      transaction_time: `${transaction_time} ms`,
      time_total: `${time_total} ms`,
      observation,
    });
  }
}

export default ShowMetricsUserService;

import { getRepository, Repository } from 'typeorm';

import IMetricsRepository from '@modules/metrics/repositories/IMetricsRepository';
import ICreateMetricDTO from '@modules/metrics/dtos/ICreateMetricDTO';
import Metrics from '../entities/Metrics';

class MetricsRepository implements IMetricsRepository {
  private ormRepository: Repository<Metrics>;

  constructor() {
    this.ormRepository = getRepository(Metrics);
  }

  public async findByUserId(user_id: string): Promise<Metrics[]> {
    const metrics = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return metrics;
  }

  public async create({
    user_id,
    transaction_name,
    transaction_time,
    observation,
  }: ICreateMetricDTO): Promise<Metrics> {
    const metric = this.ormRepository.create({
      user_id,
      transaction_name,
      transaction_time,
      observation,
    });

    await this.ormRepository.save(metric);

    return metric;
  }
}

export default MetricsRepository;

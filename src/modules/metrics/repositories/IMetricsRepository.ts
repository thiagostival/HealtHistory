import ICreateMetricDTO from '@modules/metrics/dtos/ICreateMetricDTO';
import Metrics from '../infra/typeorm/entities/Metrics';

export default interface IMetricsRepository {
  findByUserId(user_id: string): Promise<Metrics[]>;
  create({
    user_id,
    transaction_name,
    transaction_time,
    observation,
  }: ICreateMetricDTO): Promise<Metrics>;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('metrics')
class Metrics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;

  @Column()
  transaction_name: string;

  @Column()
  transaction_time: string;

  @Column()
  observation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Metrics;

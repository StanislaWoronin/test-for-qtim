import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { WithId } from '../../shared/types/with-id';
import { TMetadata } from '../../shared/types/metadata.type';

@Entity({ name: 'session' })
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  browser: string;

  @Column()
  createdAt: number;

  @ManyToOne(() => UserEntity, (u) => u.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  static create(data: WithId<TMetadata>, createdAt: number): SessionEntity {
    return Object.assign(new SessionEntity(), {
      browser: data.browser,
      user: data.id,
      createdAt,
    });
  }
}

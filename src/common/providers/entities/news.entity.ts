import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { NewsDto } from '../../../modules/news/dto/news.dto';
import { WithId } from '../../shared/types/with-id';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  data: string;

  @Column({ length: 30 })
  createdAt: string = new Date().toISOString();

  @ManyToOne(() => UserEntity, (u) => u.news)
  @JoinColumn({ name: 'user_id' })
  creator: UserEntity;

  static create({ title, description, data, id }: WithId<NewsDto>): NewsEntity {
    const newNews = Object.assign(new NewsEntity(), {
      title,
      description,
      data,
      creator: id,
    });

    return newNews;
  }
}

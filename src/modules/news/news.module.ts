import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsRepository } from './repositories/news.repository';
import { NewsQueryRepository } from './repositories/news.query-repository';
import { NewsController } from './news.controller';
import { AuthQueryRepository } from '../auth/repositories/auth.query-repository';
import { SessionEntity } from '../../common/providers/entities/session.entity';
import { UserEntity } from '../../common/providers/entities/user.entity';
import { NEWS_COMMANDS_HANDLERS } from './commands';
import { NewsEntity } from '../../common/providers/entities/news.entity';
import { NEWS_QUERIES_HANDLERS } from './queries';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, SessionEntity, UserEntity])],
  controllers: [NewsController],
  providers: [
    AuthQueryRepository,
    NewsRepository,
    NewsQueryRepository,
    ...NEWS_COMMANDS_HANDLERS,
    ...NEWS_QUERIES_HANDLERS,
  ],
})
export class NewsModule {}

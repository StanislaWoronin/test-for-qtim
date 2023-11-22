import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from '../../../common/providers/entities/news.entity';
import { DataAndCountType } from '../../../common/shared/types/data-and-count.type';

@Injectable()
export class NewsQueryRepository {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async findNewsViaId(newsId: string): Promise<string> {
    const result = await this.newsRepository
      .createQueryBuilder('news')
      .innerJoin('news.creator', 'user')
      .where('news.id = :newsId', { newsId })
      .select('news.id')
      .addSelect('user.id')
      .getOne();

    return result?.creator.id;
  }

  async findNews(
    pageSize: number,
    skipNumber: number,
  ): Promise<DataAndCountType<NewsEntity>> {
    return await this.newsRepository
      .createQueryBuilder('news')
      .leftJoin('news.creator', 'creator')
      .select([
        'news.id',
        'news.title',
        'news.description',
        'news.data',
        'news.createdAt',
        'creator.id',
        'creator.email',
      ])
      .skip(skipNumber)
      .take(pageSize)
      .orderBy('news.createdAt', 'DESC')
      .getManyAndCount();
  }
}

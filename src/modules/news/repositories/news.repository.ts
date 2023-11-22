import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../../../common/providers/entities/news.entity';
import { Repository } from 'typeorm';
import { IdResult } from '../../../common/shared/results/id.result';
import { WithId } from '../../../common/shared/types/with-id';
import { NewsDto } from '../dto/news.dto';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async createNews(newNews: NewsEntity): Promise<IdResult> {
    const { id } = await this.newsRepository.save(newNews);

    return { id };
  }

  async updateNews({ id, ...dto }: WithId<NewsDto>): Promise<boolean> {
    const { affected } = await this.newsRepository.update({ id }, dto);

    return affected === 1;
  }

  async deleteNews(id: string): Promise<boolean> {
    const { affected } = await this.newsRepository.delete({
      id,
    });

    return affected === 1;
  }
}

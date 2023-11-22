import { WithId } from '../../../common/shared/types/with-id';
import { NewsDto } from '../dto/news.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseUseCase } from '../../../common/use-cases/base.use-case';
import { IdResult } from '../../../common/shared/results/id.result';
import { NewsRepository } from '../repositories/news.repository';
import { NewsEntity } from '../../../common/providers/entities/news.entity';
import { NewsQueryRepository } from '../repositories/news.query-repository';
import { BadRequestException } from '@nestjs/common';

export class CreateNewsCommand {
  constructor(public readonly dto: WithId<NewsDto>) {}
}

@CommandHandler(CreateNewsCommand)
export class CreateNewsCommandHandler
  extends BaseUseCase<CreateNewsCommand, IdResult>
  implements ICommandHandler<CreateNewsCommand>
{
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly newsQueryRepository: NewsQueryRepository,
  ) {
    super();
  }

  async executeUseCase({ dto }: CreateNewsCommand): Promise<IdResult> {
    const titleExists = await this.newsQueryRepository.titleExists(dto.title);
    if (titleExists)
      throw new BadRequestException('Новость с таким названием уже существует');

    const newNews = NewsEntity.create(dto);
    return this.newsRepository.createNews(newNews);
  }
}

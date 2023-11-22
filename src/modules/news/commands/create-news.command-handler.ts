import { WithId } from '../../../common/shared/types/with-id';
import { NewsDto } from '../dto/news.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseUseCase } from '../../../common/use-cases/base.use-case';
import { IdResult } from '../../../common/shared/results/id.result';
import { NewsRepository } from '../repositories/news.repository';
import { NewsEntity } from '../../../common/providers/entities/news.entity';

export class CreateNewsCommand {
  constructor(public readonly dto: WithId<NewsDto>) {}
}

@CommandHandler(CreateNewsCommand)
export class CreateNewsCommandHandler
  extends BaseUseCase<CreateNewsCommand, IdResult>
  implements ICommandHandler<CreateNewsCommand>
{
  constructor(private readonly newsRepository: NewsRepository) {
    super();
  }

  async executeUseCase({ dto }: CreateNewsCommand): Promise<IdResult> {
    const newNews = NewsEntity.create(dto);
    return this.newsRepository.createNews(newNews);
  }
}

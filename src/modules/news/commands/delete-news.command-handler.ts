import { WithUserId } from '../../../common/shared/types/with-user-id.type';
import { TId } from '../../../common/shared/types/id.type';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseUseCase } from '../../../common/use-cases/base.use-case';
import { NewsRepository } from '../repositories/news.repository';
import { NewsQueryRepository } from '../repositories/news.query-repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class DeleteNewsCommand {
  constructor(public readonly dto: WithUserId<TId>) {}
}

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsCommandHandler
  extends BaseUseCase<DeleteNewsCommand, boolean>
  implements ICommandHandler<DeleteNewsCommand>
{
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly newsQueryRepository: NewsQueryRepository,
  ) {
    super();
  }

  async executeUseCase({ dto }: DeleteNewsCommand): Promise<boolean> {
    const creatorId = await this.newsQueryRepository.findNewsViaId(dto.id);
    if (creatorId && creatorId !== dto.userId) throw new ForbiddenException();
    if (!creatorId) throw new NotFoundException();

    return this.newsRepository.deleteNews(dto.id);
  }
}

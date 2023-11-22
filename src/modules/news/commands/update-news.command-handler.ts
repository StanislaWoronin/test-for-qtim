import { WithUserId } from '../../../common/shared/types/with-user-id.type';
import { WithId } from '../../../common/shared/types/with-id';
import { NewsDto } from '../dto/news.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseUseCase } from '../../../common/use-cases/base.use-case';
import { NewsRepository } from '../repositories/news.repository';
import { NewsQueryRepository } from '../repositories/news.query-repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class UpdateNewsCommand {
  constructor(public readonly dto: WithUserId<WithId<NewsDto>>) {}
}

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsCommandHandler
  extends BaseUseCase<UpdateNewsCommand, boolean>
  implements ICommandHandler<UpdateNewsCommand>
{
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly newsQueryRepository: NewsQueryRepository,
  ) {
    super();
  }

  async executeUseCase({ dto }: UpdateNewsCommand): Promise<boolean> {
    const { userId, ...newsDto } = dto;

    const creatorId = await this.newsQueryRepository.findNewsViaId(newsDto.id);
    if (creatorId && creatorId !== userId) throw new ForbiddenException();
    if (!creatorId) throw new NotFoundException();

    return this.newsRepository.updateNews(newsDto);
  }
}

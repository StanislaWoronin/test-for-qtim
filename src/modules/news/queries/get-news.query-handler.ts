import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationQuery } from '../../../common/shared/classes/pagination.query';
import { BaseUseCase } from '../../../common/use-cases/base.use-case';
import { PageResult } from '../../../common/shared/results/page.result';
import { NewsView } from '../views/news.view';
import { NewsQueryRepository } from '../repositories/news.query-repository';

export class GetNewsQuery {
  constructor(public readonly dto: PaginationQuery) {}
}

@QueryHandler(GetNewsQuery)
export class GetNewsQueryHandler
  extends BaseUseCase<GetNewsQuery, PageResult<NewsView>>
  implements IQueryHandler<GetNewsQuery>
{
  constructor(private readonly newsQueryRepository: NewsQueryRepository) {
    super();
  }

  async executeUseCase({ dto }: GetNewsQuery): Promise<PageResult<NewsView>> {
    const skipNumber = PaginationQuery.skip(dto);

    const newsAndCount = await this.newsQueryRepository.findNews(
      dto,
      skipNumber,
    );

    return PageResult.toView<NewsView>(newsAndCount, dto.pageNumber);
  }
}

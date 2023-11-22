import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { newsEndpoint } from '../../common/constants/endpoints/news.endpoint';
import { IdResult } from '../../common/shared/results/id.result';
import { NewsDto } from './dto/news.dto';
import { CurrentUserId } from '../../common/decorators/current-user-id.decorator';
import {
  CreateNewsCommand,
  DeleteNewsCommand,
  UpdateNewsCommand,
} from './commands';
import { BearerGuard } from '../../common/guards/bearer.guard';
import {
  ApiCreateNews,
  ApiUpdateNews,
  ApiDeleteNews,
  ApiGetPageWithNews,
} from '../../common/documentations/create-news';

import { PaginationQuery } from '../../common/shared/classes/pagination.query';
import { GetNewsQuery } from './queries';
import { PageResult } from '../../common/shared/results/page.result';
import { NewsView } from './views/news.view';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller(newsEndpoint.default)
export class NewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(BearerGuard)
  @ApiCreateNews()
  async createNews(
    @CurrentUserId() userId: string,
    @Body() dto: NewsDto,
  ): Promise<IdResult> {
    return await this.commandBus.execute<CreateNewsCommand, IdResult>(
      new CreateNewsCommand({ id: userId, ...dto }),
    );
  }

  @Put(newsEndpoint.byId)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(BearerGuard)
  @ApiUpdateNews()
  async updateNews(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateNewsDto,
    @Param('newsId') newsId: string,
  ): Promise<boolean> {
    return this.commandBus.execute<UpdateNewsCommand, boolean>(
      new UpdateNewsCommand({ id: newsId, userId, ...dto }),
    );
  }

  @Get()
  @ApiGetPageWithNews()
  async getNews(
    @Query() query: PaginationQuery,
  ): Promise<PageResult<NewsView>> {
    return this.queryBus.execute(new GetNewsQuery(query));
  }

  @Delete(newsEndpoint.byId)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(BearerGuard)
  @ApiDeleteNews()
  async deleteNews(
    @CurrentUserId() userId: string,
    @Param('newsId') newsId: string,
  ): Promise<boolean> {
    return this.commandBus.execute<DeleteNewsCommand, boolean>(
      new DeleteNewsCommand({ id: newsId, userId }),
    );
  }
}

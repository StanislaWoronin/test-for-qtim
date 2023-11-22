import { IQueryHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { GetNewsQueryHandler } from './get-news.query-handler';

export * from './get-news.query-handler';

export const NEWS_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
  GetNewsQueryHandler,
];

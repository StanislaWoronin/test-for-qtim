import { ICommandHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { CreateNewsCommandHandler } from './create-news.command-handler';
import { UpdateNewsCommandHandler } from './update-news.command-handler';
import { DeleteNewsCommandHandler } from './delete-news.command-handler';

export * from './create-news.command-handler';
export * from './update-news.command-handler';
export * from './delete-news.command-handler';

export const NEWS_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  CreateNewsCommandHandler,
  UpdateNewsCommandHandler,
  DeleteNewsCommandHandler,
];

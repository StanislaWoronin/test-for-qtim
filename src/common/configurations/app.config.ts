import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ExceptionsFilter } from '../exeptions/exeption.filter';

export const appConfig = (app: INestApplication) => {
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: false,
    }),
  );
  app.useGlobalFilters(new ExceptionsFilter());
};

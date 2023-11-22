import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResult } from '../../shared/results/error.result';
import { UpdateNewsDto } from '../../../modules/news/dto/update-news.dto';

export function ApiUpdateNews() {
  return applyDecorators(
    ApiTags('News'),
    ApiOperation({
      summary: 'Обновление новости',
      description:
        'Пользователь, который является создателем новости, может обновить ее',
    }),
    ApiBearerAuth('jwt'),
    ApiBody({
      type: UpdateNewsDto,
    }),
    ApiNoContentResponse({
      description: 'Новость успешно обновлена',
    }),
    ApiBadRequestResponse({
      description: 'Если переданные данные не соответствуют формату dto',
      type: ErrorResult,
    }),
    ApiUnauthorizedResponse({
      description:
        'Если авторизационный токен не передан или токен не валидный',
    }),
    ApiForbiddenResponse({
      description:
        'Пользователь не может обновить новость, которая не принадлежит ему',
    }),
    ApiNotFoundResponse({
      description: 'Новость с данным идентификатором не найдена',
    }),
  );
}

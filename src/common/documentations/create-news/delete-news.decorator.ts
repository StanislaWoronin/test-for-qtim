import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiDeleteNews() {
  return applyDecorators(
    ApiTags('News'),
    ApiOperation({
      summary: 'Удаление новости',
      description:
        'Пользователь, который является создателем новости, может ее удалить',
    }),
    ApiBearerAuth('jwt'),
    ApiNoContentResponse({
      description: 'Новость успешно удалена',
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

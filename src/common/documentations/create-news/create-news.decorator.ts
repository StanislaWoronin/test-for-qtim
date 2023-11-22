import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NewsDto } from '../../../modules/news/dto/news.dto';
import { IdResult } from '../../shared/results/id.result';
import { ErrorResult } from '../../shared/results/error.result';

export function ApiCreateNews() {
  return applyDecorators(
    ApiTags('News'),
    ApiOperation({
      summary: 'Создание новой новости',
      description: 'Зарегестрированный пользователь может создать новость',
    }),
    ApiBearerAuth('jwt'),
    ApiBody({
      type: NewsDto,
    }),
    ApiCreatedResponse({
      description: 'Новость успешно создана',
      type: IdResult,
    }),
    ApiBadRequestResponse({
      description:
        'Если переданные данные не соответствуют формату dto или новость с переданным названием уже существует',
      type: ErrorResult,
    }),
    ApiUnauthorizedResponse({
      description:
        'Если авторизационный токен не передан или токен не валидный',
    }),
  );
}

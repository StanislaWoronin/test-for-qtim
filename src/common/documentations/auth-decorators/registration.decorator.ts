import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from '../../../modules/auth/dto';
import { ErrorResult } from '../../shared/results/error.result';

export function ApiRegistration() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({
      summary: 'Регистрация нового пользователя в системе',
      description:
        'Пользователь вводи свою электронную почту и ему приходит письмо в котором содержатся данные, необходимые для авторизации',
    }),
    ApiBody({
      type: AuthDto,
    }),
    ApiNoContentResponse({
      description: 'Новый пользователь успешно создан',
    }),
    ApiBadRequestResponse({
      description:
        'Если переданные данные не соответствуют формату dto или если почта или логин уже есть в системе',
      type: ErrorResult,
    }),
  );
}

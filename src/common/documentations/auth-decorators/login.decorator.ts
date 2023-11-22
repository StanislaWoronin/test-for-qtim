import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthDto } from '../../../modules/auth/dto';
import { settings } from '../../configurations';
import { LoginView } from '../../../modules/auth/views/login.view';

export function ApiLogin() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ summary: 'Логин' }),
    ApiBody({ type: AuthDto }),
    ApiCreatedResponse({
      description: `Вернет в "теле" accessToken, который заекспарится через ${settings.ttl.accessToken} и refreshToken в куки (${settings.ttl.refreshToken})`,
      type: LoginView,
    }),
    ApiUnauthorizedResponse({
      description:
        'Если авторизационный токен не передан или токен не валидный',
    }),
  );
}

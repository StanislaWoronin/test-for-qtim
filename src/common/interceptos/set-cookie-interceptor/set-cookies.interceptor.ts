import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';
import { LoginView } from '../../../modules/auth/views/login.view';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from '../../constants/environment.constant';
import { tokenTimeLifeToMilliseconds } from '../../shared/utils/token-time-life-to-second.util';

@Injectable()
export class SetCookiesInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<LoginView> {
    const response = context.switchToHttp().getResponse<Response>();
    const tokenTimeLife = this.configService.get(
      environmentConstant.ttl.refreshToken,
    );

    return next.handle().pipe(
      tap((result) => {
        if (result && result.refreshToken) {
          response.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: tokenTimeLifeToMilliseconds(tokenTimeLife),
            sameSite: 'none',
          });
          delete result.refreshToken;
        }
      }),
    );
  }
}

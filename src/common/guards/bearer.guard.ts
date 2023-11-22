import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthQueryRepository } from '../../modules/auth/repositories/auth.query-repository';
import { TTokenPayload } from '../shared/types/token-payload.type';
import { environmentConstant } from '../constants/environment.constant';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { SessionEntity } from '../providers/entities/session.entity';
import { getCurrentTimeInMilliseconds } from '../shared/utils/get-current-time-in-milliseconds.util';
import { TSessionCache } from '../shared/types/session-cache.type';

@Injectable()
export class BearerGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authQueryRepository: AuthQueryRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authorizationHeader = req.headers.authorization;

      const token = authorizationHeader.split(' ')[1];
      const tokenPayload: TTokenPayload = await this.jwtService.verify(token, {
        secret: this.configService.get(environmentConstant.secret.accessToken),
      });

      let session: TSessionCache = await this.cacheManager.get('session');
      if (!session) {
        session = await this.authQueryRepository.findSessionViaCreatedAt(
          tokenPayload.userId,
          tokenPayload.iat,
        );
      }
      if (session.userId !== tokenPayload.userId) throw new Error();
      if (+session.createdAt !== tokenPayload.iat) throw new Error();

      if (tokenPayload.exp * 1000 < getCurrentTimeInMilliseconds())
        throw new Error();

      await this.cacheManager.set('session', {
        userId: session.userId,
        createdAt: session.createdAt,
      });

      req.userId = tokenPayload.userId;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

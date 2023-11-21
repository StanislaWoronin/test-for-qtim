import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WithId } from '../../../common/shared/types/with-id';
import { BaseUseCase } from '../../../common/shared/classes/base.use-case';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from '../../../common/constants/environment.constant';
import { TokensFactory } from '../../../common/factories/token.factory';
import { TMetadata } from '../../../common/shared/types/metadata.type';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LoginView } from '../views/login.view';
import { AuthRepository } from '../repositories/auth.repository';
import { TCreatedTokens } from '../../../common/shared/types/created-tokens.type';
import { SessionEntity } from '../../../common/providers/entities/session.entity';

export class LoginCommand {
  constructor(public readonly dto: WithId<TMetadata>) {}
}

@CommandHandler(LoginCommand)
export class LoginCommandHandler
  extends BaseUseCase<LoginCommand, LoginView>
  implements ICommandHandler<LoginCommand>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
    private readonly tokenFactory: TokensFactory,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
  }
  async executeUseCase({ dto }: LoginCommand): Promise<TCreatedTokens> {
    const sessionId = await this.authQueryRepository.findSessionViaBrowser(dto);
    if (sessionId) {
      await this.authRepository.deleteSession(sessionId);
      await this.cacheManager.del('session');
    }

    const tokens = await this.tokenFactory.getPairTokens(dto.id);
    const createdAt = await this.getCreatedAt(tokens.accessToken);
    const newSession = SessionEntity.create(dto, createdAt);
    await this.authRepository.createSession(newSession);

    return { ...tokens };
  }

  private getCreatedAt(token: string): Promise<number> {
    const { iat } = this.jwtService.verify(token, {
      secret: this.configService.get(environmentConstant.secret.accessToken),
    });
    return iat;
  }
}

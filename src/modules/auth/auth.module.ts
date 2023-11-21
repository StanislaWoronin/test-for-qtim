import { Module } from '@nestjs/common';
import { AuthQueryRepository } from './repositories/auth.query-repository';
import { AUTH_COMMAND_HANDLERS } from './commands';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { setCookiesInterceptorProvider } from '../../common/interceptos/set-cookie-interceptor/set-cookies-interceptor.provider';
import { TokensFactory } from '../../common/factories/token.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './repositories/auth.repository';
import { SessionEntity } from '../../common/providers/entities/session.entity';
import { UserEntity } from '../../common/providers/entities/user.entity';

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([SessionEntity, UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthRepository,
    AuthQueryRepository,
    TokensFactory,
    setCookiesInterceptorProvider,
    ...AUTH_COMMAND_HANDLERS,
  ],
})
export class AuthModule {}

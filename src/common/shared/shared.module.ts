import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { tokenTimeLifeToMilliseconds } from './utils/token-time-life-to-second.util';
import { environmentConstant } from '../constants/environment.constant';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        ttl: tokenTimeLifeToMilliseconds(
          configService.get(environmentConstant.ttl.accessToken),
        ),
      }),
    }),
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
  ],
  exports: [CacheModule],
})
export class SharedModule {}

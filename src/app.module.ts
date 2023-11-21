import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { FeaturesModule } from './modules/features.module';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from './common/providers/postgres/database.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    FeaturesModule,
    DatabaseModule,
  ],
})
export class AppModule {}

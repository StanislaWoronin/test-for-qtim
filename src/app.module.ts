import { Module } from '@nestjs/common';
import { FeaturesModule } from './modules/features.module';
import { DatabaseModule } from './common/providers/postgres/database.module';
import { SharedModule } from './common/shared/shared.module';

@Module({
  imports: [DatabaseModule, FeaturesModule, SharedModule],
})
export class AppModule {}

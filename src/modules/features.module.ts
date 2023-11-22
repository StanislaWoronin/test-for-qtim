import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [AuthModule, NewsModule],
})
export class FeaturesModule {}

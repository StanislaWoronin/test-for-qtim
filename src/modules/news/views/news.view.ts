import { NewsEntity } from '../../../common/providers/entities/news.entity';
import { ApiProperty } from '@nestjs/swagger';

type TNewsView = Omit<NewsEntity, 'creator'>;

export class NewsView implements TNewsView {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  data: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}

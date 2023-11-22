import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NewsEntity } from '../../../common/providers/entities/news.entity';

export type TNewsDto = Pick<NewsEntity, 'title' | 'description' | 'data'>;

export class NewsDto implements TNewsDto {
  @ApiProperty({
    description: 'Заголовок новости',
    example: 'Неинтересный заголовок',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Краткое описание новости',
    required: false,
    example: 'Не емкое описание',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Сама новость', example: 'Простая новость' })
  @IsString()
  @IsNotEmpty()
  data: string;
}

import { TNewsDto } from './news.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto implements TNewsDto {
  @ApiProperty({
    description: 'Заголовок новости',
    required: false,
    example: 'Интересное заголовок',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Краткое описание новости',
    required: false,
    example: 'Интригующее описание',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Сама новость',
    required: false,
    example: 'Захватывающая новость',
  })
  @IsString()
  @IsOptional()
  data: string;
}

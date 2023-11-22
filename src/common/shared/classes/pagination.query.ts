import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQuery {
  @ApiProperty({ description: 'Номер страницы', default: 1 })
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageNumber: number;

  @ApiProperty({
    description: 'Количество элементов, которые будут отображены на странице',
    default: 5,
  })
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageSize: number;

  @ApiProperty({ description: 'Поиск по строке', default: 'заголовок' })
  @IsString()
  @IsOptional()
  title: string;

  static skip({ pageNumber, pageSize }: PaginationQuery): number {
    return (pageNumber - 1) * pageSize;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { DataAndCountType } from '../types/data-and-count.type';

export class PageResult<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty()
  pageCount: number;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  total: number;

  static toView<T>(
    [data, total]: DataAndCountType<T>,
    pageNumber: number,
  ): PageResult<T> {
    return Object.assign(new PageResult(), { pageNumber, data, total });
  }
}

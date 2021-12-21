import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PageDto {
  /**
   *  页数
   */
  @IsNumber()
  readonly current: number;

  /**
   * 一页条数
   */
  @IsNumber()
  readonly pageSize: number;
}

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题必填' })
  readonly title: string;

  @ApiPropertyOptional({ description: '文章内容' })
  @IsNotEmpty({ message: '文章内容必填' })
  readonly content: string;

  @ApiProperty({ description: '分类' })
  @IsNotEmpty({ message: '分类必填' })
  readonly categoryId: number;

  @ApiPropertyOptional({ description: '标签' })
  @IsNotEmpty({ message: '标签必填' })
  readonly tagId: number[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategotyDto {
  @ApiProperty({ description: '分类名称' })
  @IsString({ message: '分类名称必填' })
  readonly categoryName: string;
}

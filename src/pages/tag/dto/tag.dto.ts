import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TagDto {
  @ApiProperty({ description: '标签名称' })
  @IsString({ message: '标签名称必填' })
  readonly tagName: string;
}

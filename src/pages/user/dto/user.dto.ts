import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: '用户名' })
  @IsString({ message: '用户名必填' })
  readonly userName: string;

  @ApiProperty({ description: '密码' })
  @IsString({ message: '密码必填' })
  readonly passWord: string;
}

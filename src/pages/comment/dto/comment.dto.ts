import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentDto {
  @IsNotEmpty({ message: '评论内容必填' })
  readonly commentContent: string;

  @IsNotEmpty({ message: '名称必填' })
  readonly commentName: string;

  @IsNotEmpty({ message: '邮箱必填' })
  readonly commentEmail: string;

  @IsNumber()
  readonly artid: number;

  readonly commentAvatar?: string;

  readonly message?: boolean;
}

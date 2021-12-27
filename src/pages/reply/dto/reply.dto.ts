import { IsNotEmpty, IsNumber } from 'class-validator';
export class ReplyDto {
  @IsNotEmpty({ message: '回复内容必填' })
  readonly replyContent: string;

  @IsNotEmpty({ message: '名称必填' })
  readonly replyName: string;

  @IsNotEmpty({ message: '邮箱必填' })
  readonly replyEmail: string;

  @IsNumber()
  readonly commentid: number;

  readonly replyAvatar?: string;
}

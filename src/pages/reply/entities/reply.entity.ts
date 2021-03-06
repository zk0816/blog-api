import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from '@/pages/comment/entities/comment.entity';

@Entity('reply')
export class ReplyEntity {
  @PrimaryGeneratedColumn()
  replyId: number; // 标记为主列，值自动生成

  //回复人名字
  @Column({ length: 10 })
  replyName: string;

  //回复人头像
  @Column({ default: '' })
  replyAvatar: string;

  //回复人邮箱
  @Column()
  replyEmail: string;

  //回复内容
  @Column({ type: 'longtext' })
  replyContent: string;

  //创建时间
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  create_time: Date;

  //更新时间
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false,
  })
  update_time: Date;

  @ManyToOne(() => CommentEntity, (comment) => comment.replys)
  comment: CommentEntity;
}

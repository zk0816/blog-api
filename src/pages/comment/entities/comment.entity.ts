import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from '@/pages/article/entities/article.entity';
import { ReplyEntity } from '@/pages/reply/entities/reply.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  commentId: number; // 标记为主列，值自动生成

  //评论人名字
  @Column({ length: 10 })
  commentName: string;

  //评论人头像
  @Column({ default: '' })
  commentAvatar: string;

  //评论人邮箱
  @Column()
  commentEmail: string;

  //评论内容
  @Column({ length: 50 })
  commentContent: string;

  //是否为留言板的评论
  @Column({ default: false })
  message: boolean;

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

  //一条评论多条回复
  @OneToMany(() => ReplyEntity, (reply) => reply.comment)
  replys: ReplyEntity[];

  //一篇文章多条评论
  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from '@/pages/comment/entities/comment.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  artid: number; // 标记为主列，值自动生成

  //标题
  @Column({ length: 50 })
  title: string;

  //作者 博客就是个人不需作者
  // @Column({ length: 20, default: '' })
  // author: string;

  //文章内容
  @Column('text')
  content: string;

  //文章分类
  @Column({ default: null })
  category: string;

  //文章标签
  @Column({ default: null })
  tag: string;

  //文章链接
  @Column({ default: null })
  thumb_url: string;

  //文章封面
  @Column({ default: null })
  cover_url: string;

  //文章游览次数
  @Column({ default: 0 })
  tour: number;

  //文章点赞次数
  @Column({ default: 0 })
  like: number;

  // @Column({ type: 'tinyint', default: null })
  // type: number;

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

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];
}

export interface CreateArticle {
  artid?: number;
  title: string;
  content: string;
  tagId: number[];
  categoryId: number;
  thumb_url?: string;
  cover_url?: string;
}

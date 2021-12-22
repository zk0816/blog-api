import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('draft')
export class DraftEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  //标题
  @Column({ length: 50, default: null })
  title: string;

  //文章内容
  @Column({ default: null })
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

  @Column({ type: 'tinyint', default: null })
  type: number;

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
}

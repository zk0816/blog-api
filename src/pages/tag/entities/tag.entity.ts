import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  tagId: number; // 标记为主列，值自动生成

  @Column({ default: '' })
  tagName: string;

  @Column({ default: null })
  tagColor: string;

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

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  //用户名
  @Column({ length: 100 })
  userName: string;

  //昵称
  @Column({ length: 100, default: null })
  nickName: string;

  //密码
  @Exclude()
  @Column({ select: false })
  passWord: string;

  //头像
  @Column({ default: null })
  avatar: string;

  //邮箱
  @Column({ default: null })
  email: string;

  //用户角色
  @Column('simple-enum', { enum: ['root', 'authro', 'visitor'] })
  role: string;

  //创建时间
  @Exclude()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  create_time: Date;

  //更新时间
  @Exclude()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false,
  })
  update_time: Date;

  /**
   * @BeforeInsert来装饰encryptPwd方法，表示该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的
   */
  @BeforeInsert()
  async encryptPwd() {
    this.passWord = await bcrypt.hashSync(this.passWord);
  }
}

import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { UserEntity } from '@/pages/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

/**
 * 本地验证策略
 */

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      usernameField: 'userName',
      passwordField: 'passWord',
    } as IStrategyOptions);
  }

  async validate(userName: string, passWord: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passWord')
      .where('user.userName=:userName', { userName })
      .getOne();

    if (!user) throw new BadRequestException('用户名不正确！');
    if (!compareSync(passWord, user.passWord))
      throw new BadRequestException('密码错误');
    return user;
  }
}

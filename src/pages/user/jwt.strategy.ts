import { UserEntity } from '@/pages/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '@/pages/user/user.service';

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET'),
    });
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
    //   secretOrKey: 'test123456',
    // });
  }

  async validate(user: UserEntity) {
    const existUser = await this.userService.getInfo(user);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }
    return existUser;
  }
}

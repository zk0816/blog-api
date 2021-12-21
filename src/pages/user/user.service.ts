import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private jwtService: JwtService,
  ) {}

  //用户注册
  async register(createUser: UserDto) {
    const { userName } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { userName },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(createUser);
    return await this.userRepository.save(newUser);
  }

  //用户登录返回token
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<UserEntity>) {
    const token = this.createToken({
      id: user.id,
      userName: user.userName,
      role: user.role,
    });
    return { token };
  }

  //获取用户信息
  async getInfo(props: Partial<UserEntity>) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.userName=:userName', { userName: props.userName })
      .getOne();
    return user;
  }
}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/pages/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStorage } from '@/pages/user/local.strategy';
import { JwtStorage } from '@/pages/user/jwt.strategy';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get<string>('SECRET', 'test123456'),
      signOptions: { expiresIn: '12h' },
    };
  },
});

//secret写死测试 上方为异步获取
// const jwtModule = JwtModule.register({
//   secret: 'test123456',
//   signOptions: { expiresIn: '4h' },
// });

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), jwtModule],
  controllers: [UserController],
  providers: [UserService, LocalStorage, JwtStorage],
  exports: [jwtModule],
})
export class UserModule {}

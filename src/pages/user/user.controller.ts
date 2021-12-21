import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Request,
  Get,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from '@/pages/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: [UserEntity] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() createUser: UserDto) {
    await this.userService.register(createUser);
    return '注册成功';
  }

  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getUserInfo(@Req() req) {
    return req.user;
  }
}

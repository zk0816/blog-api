import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//主路径是"admin"
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. 固定路径：
  //可以匹配到 get请求，http://localhost:9000/app/list
  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }

  //可以匹配到 post请求，http://localhost:9000/app/list
  // @Post('list')
  // create(): string {
  //   return this.appService.getHello();
  // }

  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9000/app/user_xx
  // @Get('user_*')
  // getUser() {
  //   return 'getUser';
  // }

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9000/app/list/xxxx
  // @Put('list/:id')
  // update() {
  //   return 'update';
  // }
}

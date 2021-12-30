import { codeMessage } from '@/core/filter/error.entity';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文的response对象
    const status = exception.getStatus(); // 获取异常状态码

    //设置错误信息
    // const message = exception.message
    //   ? exception.message
    //   : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      data: null,
      message: codeMessage[status] || exception.message,
      code: status || -1,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}

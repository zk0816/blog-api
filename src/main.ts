import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@/core/filter/http-exception.filter';
import { TransformInterceptor } from '@/core/interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册全局错误的过滤器
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局注册拦截器

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('博客管理后台')
    .setDescription('博客管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(9080);
}
bootstrap();

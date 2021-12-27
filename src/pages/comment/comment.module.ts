import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@/pages/comment/entities/comment.entity';
import { ArticleEntity } from '@/pages/article/entities/article.entity';
import { ArticleService } from '@/pages/article/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, ArticleEntity])],
  controllers: [CommentController],
  providers: [CommentService, ArticleService],
})
export class CommentModule {}

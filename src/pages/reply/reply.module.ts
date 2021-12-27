import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyEntity } from '@/pages/reply/entities/reply.entity';
import { CommentService } from '@/pages/comment/comment.service';
import { CommentEntity } from '@/pages/comment/entities/comment.entity';
import { ArticleService } from '@/pages/article/article.service';
import { ArticleEntity } from '@/pages/article/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReplyEntity, CommentEntity, ArticleEntity]),
  ],
  controllers: [ReplyController],
  providers: [ReplyService, CommentService, ArticleService],
})
export class ReplyModule {}

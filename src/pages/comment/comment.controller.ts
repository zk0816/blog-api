import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  async create(@Body() params: CommentDto) {
    return await this.commentService.create(params);
  }

  @Get('list')
  async select(@Query() params) {
    return await this.commentService.select(params);
  }
}

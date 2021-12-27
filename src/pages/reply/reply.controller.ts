import { Controller, Post, Body } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyDto } from './dto/reply.dto';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post('create')
  create(@Body() params: ReplyDto) {
    return this.replyService.create(params);
  }
}

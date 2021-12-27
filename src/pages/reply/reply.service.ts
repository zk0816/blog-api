import { CommentService } from '@/pages/comment/comment.service';
import { CommentEntity } from '@/pages/comment/entities/comment.entity';
import { ReplyEntity } from '@/pages/reply/entities/reply.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ReplyDto } from './dto/reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(ReplyEntity)
    private readonly replyRepository?: Repository<ReplyEntity>,

    private commentService?: CommentService,
  ) {}

  async create(params: ReplyDto) {
    const { commentid, replyName, replyEmail, replyContent, replyAvatar } =
      params;

    const qb = await getRepository(CommentEntity).createQueryBuilder('comment');
    const detail = await qb
      .leftJoinAndSelect('comment.replys', 'replys')
      .addSelect('comment.update_time')
      .where('comment.commentid = :commentid', { commentid })
      .getOne();
    const _replys = detail.replys || []; //保存已有回复内容
    const reply = new ReplyEntity();
    reply.replyAvatar = replyAvatar;
    reply.replyContent = replyContent;
    reply.replyEmail = replyEmail;
    reply.replyName = replyName;
    await this.replyRepository.save(reply);

    _replys.push(reply);

    const _newdetail = {
      ...detail,
      reply: _replys,
    };
    await this.commentService.updata(_newdetail);
    return '回复成功';
  }
}

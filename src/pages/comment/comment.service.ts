import { ArticleService } from './../article/article.service';
import { ArticleEntity } from '@/pages/article/entities/article.entity';
import { CommentEntity } from '@/pages/comment/entities/comment.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository?: Repository<CommentEntity>,

    private articleService?: ArticleService,
  ) {}

  async create(params: CommentDto) {
    const { artid, commentName, commentEmail, commentContent, commentAvatar } =
      params;
    // //查询名称是否重复
    // const doc = await this.commentRepository.findOne({
    //   where: { commentName },
    // });
    // if (doc) throw new HttpException('该昵称已存在', 601);

    const qb = await getRepository(ArticleEntity).createQueryBuilder('article');
    const detail = await qb
      .leftJoinAndSelect('article.comments', 'comments')
      .addSelect('article.update_time')
      .where('article.artid = :artid', { artid })
      .getOne();

    const _commnets = detail.comments || []; //保存已有评论内容
    const comment = new CommentEntity();
    comment.commentAvatar = commentAvatar;
    comment.commentContent = commentContent;
    comment.commentEmail = commentEmail;
    comment.commentName = commentName;
    await this.commentRepository.save(comment);

    _commnets.push(comment);

    const _newdetail = {
      ...detail,
      comments: _commnets,
    };
    await this.articleService.updata(_newdetail);
    return '评论成功';
  }

  //更新评论
  async updata(data: CommentEntity): Promise<CommentEntity> {
    return await this.commentRepository.save(data);
  }
}

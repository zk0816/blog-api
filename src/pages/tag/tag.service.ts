import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { TagEntity } from './entities/tag.entity';
import { colorData } from '@/pages/tag/color/color';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository?: Repository<TagEntity>,
  ) {}

  // 创建标签
  async create(props: Partial<TagEntity>): Promise<TagEntity> {
    const { tagName } = props;
    const doc = await this.tagRepository.findOne({
      where: { tagName },
    });
    const len = colorData.length;
    const _color = colorData[Math.floor(Math.random() * len)];
    const data = {
      ...props,
      tagColor: _color,
    };
    if (doc) throw new HttpException('该标签已存在', 601);
    return await this.tagRepository.save(data);
  }

  //查看所有标签
  async findAllList(): Promise<TagEntity[]> {
    const qb = await getRepository(TagEntity).createQueryBuilder('tag');
    qb.where('1=1');
    qb.orderBy('tag.create_time', 'DESC');
    return await qb.getMany();
  }

  // 刪除标签
  async remove(params) {
    const existPost = await this.tagRepository.findOne(params.tagId);
    if (!existPost) {
      throw new HttpException(`id为${params.tagId}的标签不存在`, 601);
    }
    return await this.tagRepository.remove(existPost);
  }
}

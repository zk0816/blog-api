import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository?: Repository<CategoryEntity>,
  ) {}

  // 创建分类
  async create(props: Partial<CategoryEntity>): Promise<CategoryEntity> {
    const { categoryName, categoryId } = props;
    let old;
    if (categoryId) {
      old = await this.categoryRepository.findOne(categoryId);
    }
    const doc = await this.categoryRepository.findOne({
      where: { categoryName },
    });
    if (doc) throw new HttpException('该分类已存在', 601);
    const _new = categoryId && this.categoryRepository.merge(old, props);
    return await this.categoryRepository.save(categoryId ? _new : props);
  }

  //查看所有分类
  async findAllList(): Promise<CategoryEntity[]> {
    const qb = await getRepository(CategoryEntity).createQueryBuilder(
      'category',
    );
    qb.where('1=1');
    qb.orderBy('category.create_time', 'DESC');
    return await qb.getMany();
  }

  // 刪除分类
  async remove(params) {
    const existPost = await this.categoryRepository.findOne(params.categoryId);
    if (!existPost) {
      throw new HttpException(`id为${params.categoryId}的分类不存在`, 601);
    }
    return await this.categoryRepository.remove(existPost);
  }
}

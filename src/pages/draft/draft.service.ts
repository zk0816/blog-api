import { Page, PageParams } from '@/common/common';
import { CategoryEntity } from '@/pages/category/entities/category.entity';
import { DraftEntity } from '@/pages/draft/entities/draft.entity';
import { TagEntity } from '@/pages/tag/entities/tag.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(DraftEntity)
    private readonly draftRepository?: Repository<DraftEntity>,
  ) {}

  //保存到草稿箱 只保存50条超过50条删除老的数据
  async save(params: any) {
    const { tagId, categoryId, id } = params;
    const _old = id && (await this.draftRepository.findOne(id));

    const qb = await getRepository(DraftEntity).createQueryBuilder('draft');
    const count = await qb.addSelect('draft.update_time').getMany();
    if (count.length > 50) {
      const res = await this.draftRepository.findOne(count[0].id);
      if (!!res) {
        this.draftRepository.remove(res);
      }
    }
    //查分类表
    let categoryName = '';
    let _category = {};
    if (categoryId) {
      const _categoryName = await getRepository(CategoryEntity)
        .createQueryBuilder('category')
        .where('category.categoryId = :categoryId', {
          categoryId,
        })
        .getOne();
      categoryName = _categoryName.categoryName;
      _category = _categoryName;
    }
    //查标签表
    const tagpb = await getRepository(TagEntity).createQueryBuilder('tag');
    const res = [];
    if (tagId) {
      for (let i = 0; i < tagId.length; i++) {
        const { tagName } = await tagpb
          .where('tag.tagId = :tagId', {
            tagId: tagId[i],
          })
          .getOne();
        res.push(tagName);
      }
    }
    const _post = {
      ...params,
      title: params.title,
      tag: res.join(','),
      category: categoryName,
    };

    const _new = id && this.draftRepository.merge(_old, _post);
    const _result = await this.draftRepository.save(id ? _new : _post);

    const _res = {
      id: _result.id,
      title: params.title || '',
      content: params.content || '',
      tag: res,
      category: _category,
      thumb_url: params.thumb_url,
      cover_url: params.cover_url,
    };
    return _res;
  }

  //分页查询草稿箱
  async findAllList(query: PageParams): Promise<Page<DraftEntity>> {
    const qb = await getRepository(DraftEntity).createQueryBuilder('draft');
    qb.where('1 = 1');
    qb.orderBy('draft.create_time', 'DESC');
    //总条数
    const total = await qb.getCount();
    let { current = 1, pageSize = 10 } = query;
    current = Number(current);
    pageSize = Number(pageSize);
    qb.take(pageSize);
    qb.skip(pageSize * (current - 1));
    //当前页数据
    const data = await qb.addSelect('draft.update_time').getMany();
    //替换掉updata_time 属性
    let _data = JSON.parse(
      JSON.stringify(data).replace(/update_time/g, 'time'),
    ).map(async (e: any) => {
      //查分类表
      const category = await getRepository(CategoryEntity)
        .createQueryBuilder('category')
        .where('category.categoryName = :categoryName ', {
          categoryName: e.category,
        })
        .getOne();
      //标签表
      let _res =
        e.tag === ''
          ? []
          : e.tag.split(',').map(async (v: any) => {
              const res = await getRepository(TagEntity)
                .createQueryBuilder('tag')
                .where('tag.tagName = :tagName ', {
                  tagName: v,
                })
                .getOne();
              return res;
            });
      _res = await Promise.all(_res);
      return {
        ...e,
        category: { ...category },
        tag: _res,
        time: new Date(e.time).valueOf(),
      };
    });
    _data = await Promise.all(_data);
    //当前页条数
    const pageCount = data.length;
    //总页数
    const allPage = Math.floor((total + pageSize - 1) / pageSize);
    //判断是否为第一页
    const firstPage = current === 1;
    //判断是否为最后一页
    const lastPage = current === allPage;
    //第一个下标
    const startIndex = pageSize * (current - 1);
    //最后一个下标
    const endIndex = pageSize * current;
    //上一页
    const previousPage = firstPage ? 1 : current - 1;
    //下一页
    const nextPage = lastPage ? current : current + 1;
    return {
      data: _data,
      total,
      current,
      currentPage: current,
      pageSize,
      pageCount,
      startIndex,
      endIndex,
      lastPage,
      firstPage,
      nextPage,
      previousPage,
      unit: '条',
    };
  }

  // 刪除草稿箱
  async remove(params) {
    const existPost = await this.draftRepository.findOne(params.id);
    if (!existPost) {
      throw new HttpException(`id为${params.id}的文章不存在`, 601);
    }
    return await this.draftRepository.remove(existPost);
  }
}

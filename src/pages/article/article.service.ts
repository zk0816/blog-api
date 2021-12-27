import { CategoryEntity } from 'src/pages/category/entities/category.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ArticleEntity, CreateArticle } from './entities/article.entity';
import { Page, PageParams } from '@/common/common';
import { TagEntity } from '@/pages/tag/entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository?: Repository<ArticleEntity>,
  ) {}

  //创建/修改文章
  async create(post: CreateArticle): Promise<ArticleEntity> {
    const { title, content, tagId, categoryId, artid } = post;
    let _old;
    if (artid) {
      _old = await this.articleRepository.findOne(artid);
    } else {
      if (!title) throw new HttpException('缺少文章标题', 400);
      if (!content) throw new HttpException('请填写文章内容', 400);
      // const doc = await this.articleRepository.findOne({ where: { title } });
      // if (doc) {
      //   throw new HttpException('文章已存在', 601);
      // }
    }
    //查分类表
    const { categoryName } = await getRepository(CategoryEntity)
      .createQueryBuilder('category')
      .where('category.categoryId = :categoryId', {
        categoryId,
      })
      .getOne();
    //查标签表
    const tagpb = await getRepository(TagEntity).createQueryBuilder('tag');
    const res = [];
    for (let i = 0; i < tagId.length; i++) {
      const { tagName } = await tagpb
        .where('tag.tagId = :tagId', {
          tagId: tagId[i],
        })
        .getOne();
      res.push(tagName);
    }
    const _post = {
      ...post,
      tag: res.join(','),
      category: categoryName,
    };
    const _new = artid && this.articleRepository.merge(_old, _post);
    return await this.articleRepository.save(artid ? _new : _post);
  }

  //更新文章
  async updata(data: ArticleEntity): Promise<ArticleEntity> {
    return await this.articleRepository.save(data);
  }

  //获取文章列表
  async findAllList(query: PageParams): Promise<Page<ArticleEntity>> {
    const qb = await getRepository(ArticleEntity).createQueryBuilder('article');
    qb.where('1 = 1');
    qb.orderBy('article.create_time', 'DESC');
    //总条数
    const total = await qb.getCount();
    let { current = 1, pageSize = 10 } = query;
    current = Number(current);
    pageSize = Number(pageSize);
    qb.take(pageSize);
    qb.skip(pageSize * (current - 1));
    //当前页数据
    const data = await qb.addSelect('article.update_time').getMany();
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
      let _res = e.tag.split(',').map(async (v: any) => {
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

  // 获取指定文章
  async findById(query): Promise<ArticleEntity> {
    const { artid } = query;
    const qb = await getRepository(ArticleEntity).createQueryBuilder('article');
    const detail = await qb
      .addSelect('article.update_time')
      .where('article.artid = :artid', { artid })
      .getOne();
    console.log(detail);
    if (!detail) {
      throw new HttpException('文章不存在', 601);
    }
    const _detail = JSON.parse(
      JSON.stringify(detail).replace(/update_time/g, 'time'),
    );
    _detail.time = new Date(_detail.time).valueOf();
    return _detail;
  }

  // 刪除文章
  async remove(params) {
    const existPost = await this.articleRepository.findOne(params.artid);
    if (!existPost) {
      throw new HttpException(`artid为${params.artid}的文章不存在`, 601);
    }
    return await this.articleRepository.remove(existPost);
  }
}

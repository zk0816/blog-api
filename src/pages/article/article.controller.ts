import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Page } from '@/common/common';
import { ArticleEntity } from './entities/article.entity';
import { PageDto, CreateArticleDto } from './dto/article.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  /**
   * 创建文章
   * @param post
   */
  @ApiOperation({ summary: '创建文章' })
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async create(@Body() props: CreateArticleDto) {
    await this.articleService.create(props);
    return '创建成功!';
  }

  /**
   * 获取所有文章
   */
  @ApiOperation({ summary: '获取文章列表' })
  @Get('list')
  // eslint-disable-next-line prettier/prettier
  async findAll(@Query() query: PageDto): Promise<Page<ArticleEntity>> {
    return await this.articleService.findAllList(query);
  }

  /**
   * 获取指定文章
   * @param artid
   */
  @ApiOperation({ summary: '获取指定文章' })
  @Get('detail?')
  async findById(@Query() query) {
    return await this.articleService.findById(query);
  }

  /**
   * 删除
   * @param id
   */
  @ApiOperation({ summary: '删除文章' })
  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  async remove(@Body() params) {
    await this.articleService.remove(params);
    return '删除成功！';
  }
}

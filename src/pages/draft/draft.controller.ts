import { Page } from '@/common/common';
import { PageDto } from '@/pages/article/dto/article.dto';
import { DraftEntity } from '@/pages/draft/entities/draft.entity';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DraftService } from './draft.service';

//草稿箱
@Controller('draft')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}
  /**
   * 实时保存到草稿箱
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('save')
  async create(@Body() props: any) {
    return await this.draftService.save(props);
  }

  /**
   * 获取所有草稿
   */
  @Get('list')
  // eslint-disable-next-line prettier/prettier
  async findAll(@Query() query: PageDto): Promise<Page<DraftEntity>> {
    return await this.draftService.findAllList(query);
  }
}

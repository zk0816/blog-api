import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('标签')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * 新建标签
   */
  @ApiOperation({ summary: '创建标签' })
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async create(@Body() props: TagDto) {
    await this.tagService.create(props);
    return '创建成功！';
  }

  /**
   * 获取所有标签
   */
  @ApiOperation({ summary: '获取所有标签' })
  @Get('list')
  async findAllList() {
    return await this.tagService.findAllList();
  }

  /**
   * 删除标签
   */
  @ApiOperation({ summary: '删除标签' })
  @Post('delete')
  async remove(@Body() params) {
    await this.tagService.remove(params);
    return '删除成功！';
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategotyDto } from './dto/category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 新建分类
   */
  @ApiOperation({ summary: '创建分类' })
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async create(@Body() props: CategotyDto) {
    await this.categoryService.create(props);
    return '创建成功！';
  }

  /**
   * 获取所有分类
   */
  @ApiOperation({ summary: '获取所有分类' })
  @Get('list')
  async findAllList() {
    return await this.categoryService.findAllList();
  }

  /**
   * 删除分类
   */
  @ApiOperation({ summary: '删除分类' })
  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  async remove(@Body() params) {
    await this.categoryService.remove(params);
    return '删除成功！';
  }
}

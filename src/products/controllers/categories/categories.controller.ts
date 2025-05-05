import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, NotFoundException, Body } from '@nestjs/common';
import { CategoryService } from 'src/products/services/category/category.service';
import { Category } from 'src/products/entities/category';
import { CreateCategoryRequestMessage } from 'src/products/dtos/create-category-request-message';
import { UpdateCategoryRequestMessage } from 'src/products/dtos/update-category-request-message';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoryService: CategoryService
  ) {}

  @Get()
  async getCategories() {
    return await this.categoryService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    let category = await this.categoryService.findOne(id)
    console.log(category)
    if (!category)
      throw new NotFoundException('Category not found')
    return category
  }

  @Post('')
  async create(@Body() payload: CreateCategoryRequestMessage) {
    let category = new Category()
    category.name = payload.name
    return await this.categoryService.save(category)
  }

  @Put(':id')
  async update(
    @Body() payload: UpdateCategoryRequestMessage,
    @Param('id', ParseIntPipe) id: number
  ) {
    let targetBrand = await this.categoryService.findOne(id)
    if (!targetBrand)
      throw new NotFoundException('Category not found')
    let category = new Category()
    category.id = id
    category.name = payload.name
    return await this.categoryService.update(category)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    let targetBrand = await this.categoryService.findOne(id)
    if (!targetBrand)
      throw new NotFoundException('Category not found')
    await this.categoryService.remove(id)
    return targetBrand
  }
}

import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateBrandRequestMessage } from 'src/products/dtos/create-brand-request-message';
import { UpdateBrandRequestMessage } from 'src/products/dtos/update-brand-request-message';
import { Brand } from 'src/products/entities/brand';
import { BrandService } from 'src/products/services/brand/brand.service';

@Controller('brands')
export class BrandsController {
  constructor(
    @Inject() private brandService: BrandService
  ) {}

  @Get()
  async getBrands() {
    return await this.brandService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    let brand = await this.brandService.findOne(id)
    console.log(brand)
    if (!brand)
      throw new NotFoundException('Brand not found')
    return brand
  }

  @Post('')
  async create(@Body() payload: CreateBrandRequestMessage) {
    let brand = new Brand()
    brand.name = payload.name
    brand.imageSrc = payload.imageSrc
    return await this.brandService.save(brand)
  }

  @Put(':id')
  async update(
    @Body() payload: UpdateBrandRequestMessage,
    @Param('id', ParseIntPipe) id: number
  ) {
    let targetBrand = await this.brandService.findOne(id)
    if (!targetBrand)
      throw new NotFoundException('Brand not found')
    let brand = new Brand()
    brand.id = id
    brand.name = payload.name
    brand.imageSrc = payload.imageSrc
    return await this.brandService.update(brand)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    let targetBrand = await this.brandService.findOne(id)
    if (!targetBrand)
      throw new NotFoundException('Brand not found')
    await this.brandService.remove(id)
    return targetBrand
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductService } from 'src/products/services/product/product.service';
import { CreateProductRequestMessage } from 'src/products/dtos/create_product_request_message';
import { Product } from 'src/products/entities/product';
import { UpdateProductRequestMessage } from 'src/products/dtos/update_product_request_message';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrandService } from 'src/products/services/brand/brand.service';
import { CategoryService } from 'src/products/services/category/category.service';
import { GetProductListRequestMessage } from 'src/products/dtos/get-product-list-request-message';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { PublicEndpoint } from 'src/auth/decorators/public-endpoint.decorator';
import { AllowedRoles } from 'src/auth/decorators/allowed-roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { AllowedRolesGuard } from 'src/auth/guards/allowed-roles/allowed-roles.guard';

// @ApiTags('products')
@UseGuards(JwtAuthGuard, AllowedRolesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) {}

  @Get()
  @PublicEndpoint()
  @ApiOperation({summary: 'Retrieve all products based on the given filters'})
  getList(
    @Query() query: GetProductListRequestMessage
  ) {
    console.log(query)
    return this.productService.findAll(
      query.page,
      query.limit,
      query.minPrice,
      query.maxPrice)
  }

  @Get(':id')
  @PublicEndpoint()
  async getOne(@Param('id', ParseIntPipe) id: number) {
    let product = await this.productService.findOne(id)
    if (!product) throw new NotFoundException('Element not found')
    return product
  }

  @Post()
  @AllowedRoles(Role.ADMIN)
  async create(@Body() payload: CreateProductRequestMessage) {
    let product: Product = new Product()
    product.name = payload.name
    product.price = payload.price
    product.stock = payload.stock
    product.imgUrl = payload.imgUrl
    let brand = await this.brandService.findOne(payload.brandId)
    if (!brand)
      throw new NotFoundException(`Brand with id=${payload.brandId} does not exists. The product cannot be created`)
    product.brand = brand
    let categories = await this.categoryService.findAll(payload.categoryIds)
    product.categories = categories
    return this.productService.save(product)
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductRequestMessage) {
    // let product = await this.productService.findOne(id)
    let product: Product = new Product()
    product.id = id
    product.name = payload.name
    product.price = payload.price
    product.stock = payload.stock
    product.imgUrl = payload.imgUrl
    let targetProduct = await this.productService.findOne(id)
    if (!targetProduct)
      throw new NotFoundException('Product not found')
    if (payload.brandId) {
      let brand = await this.brandService.findOne(payload.brandId)
      if (!brand)
        throw new NotFoundException(`Brand with id=${payload.brandId} does not exists. Request cannot be completed.`)
      product.brand = brand
    }
    let p = await this.productService.save(product)
    console.log(p)
    return await this.productService.findOne(id)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    let product = this.productService.remove(id)
    if (!product) throw new NotFoundException('Element not found')
    return product
  }
}

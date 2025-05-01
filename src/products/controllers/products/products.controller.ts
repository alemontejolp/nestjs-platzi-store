import { Body, Controller, Delete, Get, Param, Post, Put, Query, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ProductService } from 'src/products/services/product/product.service';
import { CreateProductRequestMessage } from 'src/products/dtos/create_product_request_message';
import { Product } from 'src/products/entities/product';
import { UpdateProductRequestMessage } from 'src/products/dtos/update_product_request_message';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({summary: 'Retrieve all products based on the given filters'})
  getList(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
  ) {
    return this.productService.findAll()
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    let product = this.productService.findOne(id)
    if (!product) throw new NotFoundException('Element not found')
    return product
  }

  @Post()
  create(@Body() payload: CreateProductRequestMessage) {
    let product: Product = new Product({
      id: 0,
      name: payload.name,
      price: payload.price,
      stock: payload.stock
    })
    return this.productService.save(product)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductRequestMessage) {
    let product = this.productService.findOne(id)
    if (!product) {
      throw new NotFoundException('Element not found')
    }
    for (let key in payload) {
      if (product[key] != undefined) {
        product[key] = payload[key]
      }
    }
    return this.productService.save(product)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    let product = this.productService.remove(id)
    if (!product) throw new NotFoundException('Element not found')
    return product
  }
}

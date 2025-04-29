import { Body, Controller, Delete, Get, Param, Post, Put, Query, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ProductService } from 'src/services/product/product.service';
import { CreateProductRequestMessage } from 'src/dtos/create_product_request_message';
import { Product } from 'src/entities/product';
import { UpdateProductRequestMessage } from 'src/dtos/update_product_request_message';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
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

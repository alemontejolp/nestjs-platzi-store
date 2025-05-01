import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductsModule {}

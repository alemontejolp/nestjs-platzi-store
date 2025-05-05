import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { ProductService } from './services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product';
import { BrandService } from './services/brand/brand.service';
import { Brand } from './entities/brand';
import { CategoryService } from './services/category/category.service';
import { Category } from './entities/category';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Brand,
      Category,
    ])
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductService, BrandService, CategoryService],
  exports: [ProductService, TypeOrmModule]
})
export class ProductsModule {}

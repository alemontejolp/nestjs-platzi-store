import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Between } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  async findOne(id: number, fullStruct: boolean = true): Promise<Product|null> {
    let relations = fullStruct ? ['brand', 'categories'] : []
    return await this.productRepository.findOne({where: { id: id }, relations: relations})
  }

  async findAll(
    page?: number,
    limit?: number,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<Product[]> {
    let options: FindManyOptions<Product> = {}
    options.where = {}
    options.relations = ['brand', 'categories']
    if (page != undefined && limit != undefined) {
      options.take = limit
      options.skip = limit * page
    }
    if (minPrice != undefined && maxPrice != undefined) {
      options.where.price = Between(minPrice, maxPrice)
    }
    return await this.productRepository.find(options)
  }

  async update(product: Product): Promise<Product|null> {
    let foundProduct = await this.productRepository.findOne({where: {id: product.id}})
    if (!foundProduct) {
      return null
    }
    let mergedProduct = this.productRepository.merge(foundProduct, product)
    return await this.productRepository.save(mergedProduct)
  }

  async save(product: Product): Promise<Product> {
    let savedProduct = await this.productRepository.save(product)
    return savedProduct
  }

  async remove(id: number): Promise<boolean> {
    let result = await this.productRepository.delete(id)
    return !!result.affected
  }
}

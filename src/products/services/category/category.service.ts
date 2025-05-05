import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/products/entities/category';
import { FindManyOptions, In, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>
  ) {}

  async findAll(ids?: number[]) {
    let options: FindManyOptions<Category> = {}
    if (ids) {
      options.where = { id: In(ids) }
    }
    return await this.repository.find(options)
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id: id }, relations: ['products'] })
  }

  async save(item: Category) {
    return await this.repository.save(item)
  }

  async update(item: Category) {
    let targerItem = await this.repository.findOne({ where: { id: item.id } })
    if (!targerItem)
      return null
    let mergedItem = this.repository.merge(targerItem, item)
    return await this.repository.save(mergedItem)
  }

  async remove(id: number) {
    let result = await this.repository.delete(id)
    return !!result.affected
  }
}

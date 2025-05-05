import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/products/entities/brand';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private repository: Repository<Brand>
  ) {}

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id: id }, relations: ['products'] })
  }

  async save(item: Brand) {
    return await this.repository.save(item)
  }

  async update(item: Brand) {
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

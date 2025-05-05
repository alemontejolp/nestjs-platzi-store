import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/users/entities/customer';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) {}

  async findAll() {
    return await this.customerRepository.find()
  }

  async findOne(id: number) {
    return await this.customerRepository.findOne({ where: {id: id} })
  }

  async save(customer: Customer) {
    return await this.customerRepository.save(customer)
  }

  async update(customer: Customer) {
    let targetCustomer = await this.customerRepository.findOne({ where: {id: customer.id} })
    if (!targetCustomer) {
      return null
    }
    let mergedCustomer = this.customerRepository.merge(targetCustomer, customer)
    return await this.customerRepository.save(mergedCustomer)
  }

  async remove(id: number) {
    let result = await this.customerRepository.delete(id)
    return !!result.affected
  }
}

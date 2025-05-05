import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/users/entities/order';
import { OrderItem } from 'src/users/entities/order-item';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
  ) {}

  async findOne(id: number, fullStruct: boolean = false) {
    let relations = fullStruct ? ['customer', 'items.product'] : []
    return await this.orderRepository.findOne({ where: { id: id }, relations: relations })
  }

  async save(order: Order) {
    return await this.orderRepository.save(order)
  }

  async saveOrderItem(item: OrderItem) {
    return await this.orderItemRepository.save(item)
  }
}

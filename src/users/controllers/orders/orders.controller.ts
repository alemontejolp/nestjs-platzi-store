import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from 'src/products/services/product/product.service';
import { AddItemToOrderRequestMessage } from 'src/users/dtos/add-item-to-order-request-message';
import { CreateOrderRequestMessage } from 'src/users/dtos/create-order-request-message';
import { Order } from 'src/users/entities/order';
import { OrderItem } from 'src/users/entities/order-item';
import { CustomerService } from 'src/users/services/customer/customer.service';
import { OrderService } from 'src/users/services/order/order.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
  ) {}

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.orderService.findOne(id, true)
  }

  @Post()
  async createOrder(@Body() payload: CreateOrderRequestMessage) {
    let customer = await this.customerService.findOne(payload.customerId)
    if (!customer)
      throw new BadRequestException('Cannot create a order with a customer that does not exist')
    let order = new Order()
    order.customer = customer
    order = await this.orderService.save(order)
    return (await this.orderService.findOne(order.id!, true))!
  }

  @Post('add-item')
  async addItemToOrder(
    @Body() payload: AddItemToOrderRequestMessage
  ) {
    let order = await this.orderService.findOne(payload.orderId)
    if (!order)
      throw new BadRequestException('Cannot add an item to an order that does not exist')
    let product = await this.productService.findOne(payload.productId)
    if (!product)
      throw new BadRequestException('Target product does not exists')
    let orderItem = new OrderItem()
    orderItem.order = order
    orderItem.product = product
    orderItem.quantity = payload.quantity
    orderItem = await this.orderService.saveOrderItem(orderItem)
    return await this.orderService.findOne(payload.orderId, true)
  }
}

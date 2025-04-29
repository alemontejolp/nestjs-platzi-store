import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders(): string {
    return 'Orders list'
  }
}

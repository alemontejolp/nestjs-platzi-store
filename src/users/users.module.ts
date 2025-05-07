import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsModule } from 'src/products/products.module';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { Customer } from './entities/customer';
import { CustomerService } from './services/customer/customer.service';
import { Order } from './entities/order';
import { OrderItem } from './entities/order-item';
import { OrderService } from './services/order/order.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer, Order, OrderItem])],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UserService, CustomerService, OrderService],
  exports: [UserService]
})
export class UsersModule {}

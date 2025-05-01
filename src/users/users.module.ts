import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsModule } from 'src/products/products.module';
import { UserService } from './services/user/user.service';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UserService],
})
export class UsersModule {}

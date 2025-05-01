import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductService } from 'src/products/services/product/product.service';
import { Order } from 'src/users/entities/order';
import { User } from 'src/users/entities/user';

@Injectable()
export class UserService {
  constructor(
    private productService: ProductService,
    private configService: ConfigService
  ) {}
  private users: User[] = [{
    id: 1,
    name: 'Flor',
    email: 'flor@app.com'
  }]
  private lastIdx: number = 1

  findaAll() {
    console.log('API_KEY', this.configService.get('API_KEY'))
    return this.users
  }

  findOne(id: number) {
    console.log('API_KEY', this.configService.get('API_KEY'))
    return this.users[0]
  }

  getUserOrdersByUserId(userId: number) {
    let user = this.users.find(v => v.id == userId)
    if (!user) return
    return new Order({
      date: new Date(),
      user: user,
      products: this.productService.findAll()
    })
  }
}

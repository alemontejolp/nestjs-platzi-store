import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/products/services/product/product.service';
import { Order } from 'src/users/entities/order';
import { User } from 'src/users/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private productService: ProductService,
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findaAll() {
    console.log('API_KEY', this.configService.get('API_KEY'))
    return await this.userRepository.find({
      relations: ['customer']
    })
  }

  async findOne(id: number) {
    console.log('API_KEY', this.configService.get('API_KEY'))
    return await this.userRepository.findOne({ where: { id: id }, relations: ['customer'] })
  }

  async update(user: User) {
    let foundUser = await this.userRepository.findOne({where: {id: user.id}})
    if (!foundUser) {
      return null
    }
    let mergedUser = this.userRepository.merge(foundUser, user)
    return await this.userRepository.save(mergedUser)
  }

  async save(user: User) {
    let savedUser = await this.userRepository.save(user)
    return savedUser
  }

  async remove(id: number) {
    let result = await this.userRepository.delete(id)
    return !!result.affected
  }

  async getUserOrdersByUserId(userId: number) {
    let user = await  this.userRepository.findOne({ where: { id: userId } })
    if (!user) return
    return new Order()
  }
}

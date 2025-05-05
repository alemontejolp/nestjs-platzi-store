import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, ParseIntPipe, Post, Put, BadRequestException } from '@nestjs/common';
import { CreateCustomerRequestMessage } from 'src/users/dtos/create-customer-request-message';
import { UpdateCustomerRequestMessage } from 'src/users/dtos/update-customer-request-message';
import { Customer } from 'src/users/entities/customer';
import { CustomerService } from 'src/users/services/customer/customer.service';
import { UserService } from 'src/users/services/user/user.service';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject() private customerService: CustomerService,
    @Inject() private userService: UserService
  ) {}

  @Get()
  async getCustomers(){
    return await this.customerService.findAll()
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    let targetCustomer = await this.customerService.findOne(id)
    if (!targetCustomer) throw new NotFoundException('Customer not found')
    return targetCustomer
  }

  @Post()
  async create(@Body() payload: CreateCustomerRequestMessage) {
    let customer = new Customer()
    customer.phone = payload.phone
    if (!payload.userId) {
      let targetCustomer = await this.customerService.save(customer)
      return targetCustomer
    }
    let user = await this.userService.findOne(payload.userId)
    if (!user)
      throw new BadRequestException(`Cannot create the customer due to the related user with id=${payload.userId} does not exists`)
    let targetCustomer = await this.customerService.save(customer)
    user.customer = targetCustomer
    await this.userService.save(user)
    return await this.customerService.findOne(targetCustomer.id!)
  }

  @Put(':id')
  async update(
    @Body()
    payload: UpdateCustomerRequestMessage,
    @Param('id', ParseIntPipe)
    id: number
  ) {
    let customer = new Customer()
    customer.id = id
    customer.phone = payload.phone
    if (!await this.customerService.findOne(id))
      throw new NotFoundException('Customer not found')
    await this.customerService.update(customer)
    return await this.customerService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    let targetCustomer = await this.customerService.findOne(id)
    if (!targetCustomer)
      throw new NotFoundException('Customer not found')
    await this.customerService.remove(id)
    return targetCustomer
  }
}

import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from 'src/users/services/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequestMessage } from 'src/users/dtos/create-user-request-message';
import { User } from 'src/users/entities/user';
import { UpdateUserRequestMessage } from 'src/users/dtos/update-user-request-message';

// @ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.findaAll()
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    let user = await this.userService.findOne(id)
    console.log(`user=`,user)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  @Post('')
  async create(@Body() payload: CreateUserRequestMessage) {
    let user = new User()
    user.name = payload.name
    user.email = payload.email
    user.passwd = payload.passwd
    user.role = payload.role
    return await this.userService.save(user)
  }

  @Put(':id')
  async update(
    @Body()
    payload: UpdateUserRequestMessage,
    @Param('id', ParseIntPipe)
    id: number
  ) {
    let user = new User()
    user.id = id
    user.name = payload.name
    user.email = payload.email
    user.passwd = payload.passwd
    user.role = payload.role
    if (!await this.userService.findOne(id))
      throw new NotFoundException('User does not exist')
    await this.userService.update(user)
    return await this.userService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    let targetUser = await this.userService.findOne(id)
    if (!targetUser) throw new NotFoundException('User does not exist')
    await this.userService.remove(id)
    return targetUser
  }

  @Get(":id/orders")
  getUserOrders(@Param('id', ParseIntPipe) userId) {
    return this.userService.getUserOrdersByUserId(userId)
  }
}

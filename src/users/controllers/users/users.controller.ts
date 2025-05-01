import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from 'src/users/services/user/user.service';
import { ApiTags } from '@nestjs/swagger';

// @ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findaAll()
  }

  @Get(":id/orders")
  getUserOrders(@Param('id', ParseIntPipe) userId) {
    return this.userService.getUserOrdersByUserId(userId)
  }
}

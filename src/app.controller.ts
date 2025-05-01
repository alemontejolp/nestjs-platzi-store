import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('TASKS') private tasks: any[]) {}

  @Get()
  getHello(): string {
    console.log(this.tasks[0])
    return this.appService.getHello();
  }

  @Get('new-endpoint')
  newEndpoint(): string {
    return 'New endpoint'
  }
}

import { Controller, Get, Inject, Param, Query, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key/api-key.guard';
import { PublicEndpoint } from './auth/decorators/public-endpoint.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('TASKS') private tasks: any[]) {}

  @Get()
  getHello(): string {
    console.log(this.tasks[0])
    return this.appService.getHello();
  }

  // @PublicEndpoint()
  @Get('new-endpoint')
  newEndpoint(): string {
    return 'New endpoint'
  }

  @Get('demo')
  getDemoData() {
    return this.appService.getDemoData()
  }
}

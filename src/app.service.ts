import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(@Inject(config.KEY) private configService: ConfigType<typeof config>) {}
  getHello(): string {
    console.log(this.configService) // Environment variables, even using this method, are always encoded as strings.
    return `Hello World, from ${this.configService.appId}! DB://${this.configService.database.name}:${this.configService.database.port}|${this.configService.apiKey}`;
  }
}

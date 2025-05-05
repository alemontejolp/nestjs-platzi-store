import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('PG') private pgClient: Client,
  ) {}

  getHello(): string {
    console.log(this.configService) // Environment variables, even using this method, are always encoded as strings.
    return `Hello World, from ${this.configService.appId}! DB://${this.configService.database.name}:${this.configService.database.port}|${this.configService.apiKey}`;
  }

  async getDemoData() {
    let result = await this.pgClient.query('SELECT * FROM demo')
    return result.rows
  }
}

import { lastValueFrom } from 'rxjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV ?? ''] ?? '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      })
    }),
    UsersModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        let response = http.get('https://jsonplaceholder.typicode.com/todos')
        let data = await lastValueFrom(response)
        return data.data
      },
      inject: [HttpService]
    }
  ],
})
export class AppModule {}

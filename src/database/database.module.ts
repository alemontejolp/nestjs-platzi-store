import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';
import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigType<typeof config>
      ) => {
        return {
          type: 'postgres',
          host: configService.database.host,
          port: configService.database.port,
          database: configService.database.name,
          username: configService.database.user,
          password: configService.database.passwd,
          synchronize: false, // True only in development to easy testing.
          autoLoadEntities: true, // Temporal?
        }
      },
      inject: [config.KEY]
    })
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: async (
        configService: ConfigType<typeof config>
      ) => {
        let client = new Client({
          user: configService.database.user,
          host: configService.database.host,
          database: configService.database.name,
          password: configService.database.passwd,
          port: configService.database.port,
        })
        await client.connect()
        return client
      },
      inject: [config.KEY]
    }
  ],
  exports: ['PG', TypeOrmModule]
})
export class DatabaseModule {}

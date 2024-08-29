import { Global, InternalServerErrorException, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import Config from '../config';

@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      useFactory: async (configService: ConfigType<typeof Config>) => {
        const client = new Client({
          user: configService.database.postgresUser,
          host: configService.database.postgresHost,
          database: configService.database.postgresDb,
          password: configService.database.postgresPassword,
          port: configService.database.postgresPort,
        });
        try {
          await client.connect();
          return client;
        } catch (err) {
          throw new InternalServerErrorException(err);
        }
      },
      inject: [Config.KEY],
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}

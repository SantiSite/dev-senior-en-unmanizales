import { resolve, join } from 'path';

import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import { TasksModule } from './tasks/tasks.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

import Config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, join('../../', '.env')),
      isGlobal: true,
      load: [Config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .required(),
        PORT: Joi.number().required(),
        DATABASE_CONNECTION_TYPE: Joi.string()
          .valid('postgres', 'mysql')
          .required(),
        DATABASE_POSTGRES_HOST: Joi.string().when('DATABASE_CONNECTION_TYPE', {
          is: 'postgres',
          then: Joi.required(),
        }),
        DATABASE_POSTGRES_DB: Joi.string().when('DATABASE_CONNECTION_TYPE', {
          is: 'postgres',
          then: Joi.required(),
        }),
        DATABASE_POSTGRES_USER: Joi.string().when('DATABASE_CONNECTION_TYPE', {
          is: 'postgres',
          then: Joi.required(),
        }),
        DATABASE_POSTGRES_PASSWORD: Joi.string().when(
          'DATABASE_CONNECTION_TYPE',
          {
            is: 'postgres',
            then: Joi.required(),
          },
        ),
        DATABASE_POSTGRES_PORT: Joi.number().when('DATABASE_CONNECTION_TYPE', {
          is: 'postgres',
          then: Joi.required(),
        }),
      }),
    }),
    TasksModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

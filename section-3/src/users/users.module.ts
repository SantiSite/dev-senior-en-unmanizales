import { Module } from '@nestjs/common';

import { TasksModule } from '../tasks/tasks.module';

import { UsersController } from './controllers/users.controller';

import { UsersService } from './services/users.service';

@Module({
  imports: [TasksModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';

import { TasksService } from './services/tasks.service';

import { TasksController } from './controllers/tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}

import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TasksService } from '../services/tasks.service';
import { CreateTaskDto, PatchTaskDto } from '../dtos/tasks.dto';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';

@Controller('tasks')
@UseGuards(ApiKeyGuard)
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  createTask(@Body() payload: CreateTaskDto) {
    return this.tasksService.create(payload);
  }

  @Get('/')
  getAllTasks(@Query('is_completed') is_completed: boolean) {
    return this.tasksService.findAll(is_completed);
  }

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  patchTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: PatchTaskDto,
  ) {
    return this.tasksService.patch(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}

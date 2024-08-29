import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TasksService } from '../../tasks/services/tasks.service';
import { CreateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(ApiKeyGuard)
export class UsersController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create/Register a new user' })
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Get('/:id/tasks')
  getUserTasks(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getUserTasks(id);
  }
}

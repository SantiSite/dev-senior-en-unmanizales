import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Client } from 'pg';

import { Task } from '../entities/tasks.entity';
import { CreateTaskDto, PatchTaskDto } from '../dtos/tasks.dto';

@Injectable()
export class TasksService {
  constructor(@Inject('PG') private readonly pg: Client) {}

  async create(data: CreateTaskDto): Promise<Task> {
    const res = await this.pg.query(
      'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [data.title, data.description, 1],
    );
    return res.rows[0];
  }

  async findOne(id: number): Promise<Task> {
    const res = await this.pg.query('SELECT * FROM tasks WHERE id = $1', [id]);
    const task = res.rows[0];
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }

  async findAll(is_completed: boolean = false): Promise<Task[]> {
    const res = await this.pg.query(
      'SELECT * FROM tasks WHERE is_completed = $1',
      [is_completed],
    );
    return res.rows;
  }

  async patch(id: number, data: PatchTaskDto): Promise<void> {
    await this.findOne(id);
    let baseQuery = 'UPDATE tasks SET';
    const columns = Object.keys(data);
    for (let i = 0; i < columns.length; i++) {
      baseQuery += ` ${columns[i]} = $${i + 1}`;
    }
    baseQuery += ` WHERE id = $${columns.length + 1}`;
    const values: string | number[] = [];
    for (const key in data) {
      values.push(data[key]);
    }
    values.push(id);
    await this.pg.query(baseQuery, values);
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    const res = await this.pg.query('SELECT * FROM tasks WHERE user_id = $1', [
      userId,
    ]);
    return res.rows;
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.pg.query('DELETE FROM tasks WHERE id = $1', [id]);
  }
}

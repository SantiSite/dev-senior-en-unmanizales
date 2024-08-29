import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Client } from 'pg';

import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('PG') private readonly pg: Client) {}

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const res = await this.pg.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [data.name, data.email, hashedPassword],
    );
    return res.rows[0];
  }
}

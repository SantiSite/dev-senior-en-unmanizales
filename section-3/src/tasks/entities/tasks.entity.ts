import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ example: 1 })
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
}

import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'title is required' })
  @Length(3, 255, { message: 'title must be between 3 and 255 characters' })
  @ApiProperty({ description: 'The title of the task', example: 'Task 10' })
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}

export class PatchTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean()
  @IsOptional()
  readonly is_completed?: boolean;
}

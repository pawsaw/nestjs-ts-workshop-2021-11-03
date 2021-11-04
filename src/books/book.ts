import { ApiProperty } from '@nestjs/swagger';
import { Publisher } from './publisher';

export type ISBN = string;

export class Book {
  @ApiProperty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  isbn: ISBN;

  @ApiProperty()
  abstract: string;

  @ApiProperty()
  numPages: number;

  @ApiProperty()
  author: string;

  @ApiProperty()
  publisher: Publisher;
}

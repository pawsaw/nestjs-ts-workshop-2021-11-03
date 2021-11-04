import { ApiProperty } from '@nestjs/swagger';
import { Publisher } from './publisher';

export type ISBN = string;

export class Book {
  @ApiProperty()
  title: string;

  subtitle: string;
  isbn: ISBN;
  abstract: string;
  numPages: number;
  author: string;
  publisher: Publisher;
}

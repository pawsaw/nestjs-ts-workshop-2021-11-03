import { Controller, Get } from '@nestjs/common';
import { books } from '../data/books';
import { Book } from './book';

@Controller('books')
export class BooksController {
  @Get()
  findAll(): Book[] {
    return books;
  }
}

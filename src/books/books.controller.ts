import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { books } from '../data/books';
import uuidv4 from '../util/uuidv4';
import { Book, ISBN } from './book';
import { CreateBookDto } from './create-book.dto';

@Controller('books')
@ApiTags('books')
export class BooksController {
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All books in my library',
  })
  async findAll(): Promise<Book[]> {
    return books;
  }

  @Get(':isbn')
  @ApiResponse({
    status: HttpStatus.OK,
    type: Book,
    description: 'The requested Book',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Couldn't find the book with the requested ISBN",
  })
  findOne(
    @Res({ passthrough: true }) response: Response,
    @Param('isbn') isbn: ISBN,
  ): Promise<Book | null> {
    // usually we use a service which returns Promise<Book | null>

    const bookPromise = new Promise<Book | null>((resolve) => {
      setTimeout(() => {
        resolve(books.find((book) => book.isbn === isbn) ?? null);
      }, 2000);
    });

    // const bookPromise = Promise.resolve(
    //   books.find((book) => book.isbn === isbn) ?? null,
    // );

    bookPromise.then((book) => {
      if (!book) {
        response.status(HttpStatus.NOT_FOUND).send();
      }
      return book;
    });

    return bookPromise;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new Book',
    type: () => Book,
  })
  async creaeBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    const newBook = {
      ...createBookDto,
      isbn: uuidv4(),
    } as Book;

    books.push(newBook);

    return newBook;
  }
}

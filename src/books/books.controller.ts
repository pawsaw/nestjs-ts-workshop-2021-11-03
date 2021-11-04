import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { books } from '../data/books';
import { Book, ISBN } from './book';

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
  async findOne(
    @Res() response: Response,
    @Param('isbn') isbn: ISBN,
  ): Promise<Response> {
    // usually we use a service which returns Promise<Book | null>
    const bookPromise = Promise.resolve(
      books.find((book) => book.isbn === isbn) ?? null,
    );

    const book = await bookPromise;
    if (!book) {
      return response.status(HttpStatus.NOT_FOUND).send();
    } else {
      return response.json(book);
    }

    // const book = await bookPromise;

    // return response
    //   .status(book ? HttpStatus.OK : HttpStatus.NOT_FOUND)
    //   .json(book);

    // return response
    //   .status(book ? HttpStatus.OK : HttpStatus.NOT_FOUND)
    //   .json(book);
  }
}

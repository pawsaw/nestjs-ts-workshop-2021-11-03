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
import { Book, ISBN } from './book';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly _books: BooksService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All books in my library',
  })
  async findAll(): Promise<Book[]> {
    return this._books.findAll();
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
    @Res({ passthrough: true }) response: Response,
    @Param('isbn') isbn: ISBN,
  ): Promise<Book | null> {
    const book = await this._books.findOne(isbn);
    if (!book) {
      response.status(HttpStatus.NOT_FOUND).json();
    }

    return book;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new Book',
    type: () => Book,
  })
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this._books.create(createBookDto);
  }
}

import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { books } from '../data/books';
import { Book } from './book';

@Controller('books')
@ApiTags('books')
export class BooksController {
  @Get()
  //   @ApiOkResponse({
  //     description: 'All books in my library',
  //     type: Book,
  //     isArray: true,
  //   })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All books in my library',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "You're not allowed to see the library",
  })
  findAll(@Req() request: Request, @Res() res: Response): Book[] {
    res.status(HttpStatus.OK);

    // console.log('Request', request);
    return books;
  }
}

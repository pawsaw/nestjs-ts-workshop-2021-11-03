import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { BooksController } from './books/books.controller';

import { HttpModule } from '@nestjs/axios';
import { BooksService } from './books/books.service';
import { HttpBooksService } from './books/http-books.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, CatsController, BooksController],
  providers: [
    AppService,
    {
      provide: BooksService,
      useClass: HttpBooksService,
    },
  ],
})
export class AppModule {}

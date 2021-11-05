import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { HttpBooksService } from './http-books.service';

@Module({
  controllers: [BooksController],
  providers: [
    {
      provide: BooksService,
      useClass: HttpBooksService,
    },
  ],
  imports: [HttpModule],
  exports: [BooksService],
})
export class BooksModule {}

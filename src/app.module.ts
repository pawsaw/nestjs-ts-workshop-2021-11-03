import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { BooksController } from './books/books.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, BooksController],
  providers: [AppService],
})
export class AppModule {}

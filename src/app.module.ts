import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';

import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}

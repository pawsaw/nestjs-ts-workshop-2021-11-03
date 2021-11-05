import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';

import { BooksModule } from './books/books.module';
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [BooksModule, PublisherModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}

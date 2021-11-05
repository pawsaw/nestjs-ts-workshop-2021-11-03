import { Module } from '@nestjs/common';
import { IPublisherService, PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { MockPublisherService } from './mock-publisher.service';
import { BooksService } from '../books/books.service';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [PublisherController],
  providers: [
    {
      provide: PublisherService,
      useFactory: (bookService: BooksService): IPublisherService => {
        if (process.env.API_TARGET === 'bookmonkey') {
          return new PublisherService(bookService);
        } else {
          return new MockPublisherService();
        }
      },
      inject: [BooksService],
    },
  ],
})
export class PublisherModule {}

import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { ISBN } from '../books/book';
import { Publisher } from '../books/publisher';
import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get()
  findAll(@Query('name') name?: string): Observable<Publisher[]> {
    return this.publisherService.findAll(name);
  }

  @Get(':isbn')
  findOne(@Param('isbn') isbn: ISBN): Observable<Publisher> {
    return this.publisherService.findOne(isbn).pipe(
      // map((publisher) => {
      //   if (!publisher) {
      //     throw new NotFoundException();
      //   }
      //   return publisher;
      // }),
      tap((publisher) => {
        if (!publisher) {
          throw new NotFoundException();
        }
      }),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map((publisher) => publisher!),
    );
  }
}

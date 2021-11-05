import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { ISBN } from '../books/book';
import { Publisher } from '../books/publisher';
import { BooksService } from '../books/books.service';

export interface IPublisherService {
  findOne: (isbn: ISBN) => Observable<Publisher | null>;
  findAll: (name?: string) => Observable<Publisher[]>;
}

@Injectable()
export class PublisherService implements IPublisherService {
  constructor(private readonly _books: BooksService) {}

  findOne(isbn: ISBN): Observable<Publisher | null> {
    return from(this._books.findOne(isbn)).pipe(
      map((book) => book?.publisher ?? null),
    );
  }

  findAll(name?: string): Observable<Publisher[]> {
    return from(this._books.findAll()).pipe(
      map((books) => {
        let publishers = books.map((book) => book.publisher);
        if (name) {
          publishers = publishers.filter((pub) => pub.name === name);
        }
        // return publishers;
        return [...new Set(publishers)];
      }),
    );
  }
}

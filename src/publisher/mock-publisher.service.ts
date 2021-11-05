import { Injectable } from '@nestjs/common';
import { filter, map, Observable, of } from 'rxjs';
import { Book } from '../books/book';
import { Publisher } from '../books/publisher';
import { books } from '../data/books';
import { PublisherService } from './publisher.service';

@Injectable()
export class MockPublisherService implements PublisherService {
  findOne(isbn: string): Observable<Publisher | null> {
    return of<Book | null>(
      books.find((book) => book.isbn === isbn) ?? null,
    ).pipe(map((book) => (book ? book.publisher : null)));
  }
  findAll(name?: string): Observable<Publisher[]> {
    return of(
      books
        .map((book) => book.publisher)
        .filter((publisher) => {
          if (name) {
            return publisher.name === name;
          }
          return publisher;
        }),
    );
  }
}

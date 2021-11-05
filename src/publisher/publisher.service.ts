import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ISBN } from '../books/book';
import { Publisher } from '../books/publisher';

@Injectable()
export class PublisherService {
  findOne(isbn: ISBN): Observable<Publisher | null> {
    return of(null);
  }

  findAll(name?: string): Observable<Publisher[]> {
    return of([]);
  }
}

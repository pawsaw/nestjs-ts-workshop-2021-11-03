import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { response } from 'express';
import { map, firstValueFrom } from 'rxjs';
import { Book, ISBN } from './book';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class HttpBooksService implements BooksService {
  constructor(private _http: HttpService) {}

  findAll(): Promise<Book[]> {
    return firstValueFrom(
      this._http
        .get<Book[]>('http://localhost:4730/books')
        .pipe(map((response) => response.data)),
    );
  }
  findOne(isbn: ISBN): Promise<Book | null> {
    return firstValueFrom(
      this._http.get<Book>(`http://localhost:4730/books/${isbn}`).pipe(
        map((response) => {
          if (response.status !== HttpStatus.OK) {
            return null;
          }
          return response.data;
        }),
      ),
    );
  }
  create(createBookDto: CreateBookDto): Promise<Book> {
    throw new Error('Method not implemented.');
  }
}

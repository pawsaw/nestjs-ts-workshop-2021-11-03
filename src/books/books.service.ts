import { Injectable } from '@nestjs/common';
import { books } from '../data/books';
import uuidv4 from '../util/uuidv4';
import { Book, ISBN } from './book';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BooksService {
  async findAll(): Promise<Book[]> {
    return books;
  }

  async findOne(isbn: ISBN): Promise<Book | null> {
    // usually we use a service which returns Promise<Book | null>

    const bookPromise = new Promise<Book | null>((resolve) => {
      setTimeout(() => {
        resolve(books.find((book) => book.isbn === isbn) ?? null);
      }, 2000);
    });

    return bookPromise;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = {
      ...createBookDto,
      isbn: uuidv4(),
    } as Book;

    books.push(newBook);

    return newBook;
  }
}

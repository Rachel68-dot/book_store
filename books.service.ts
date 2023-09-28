/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import Db from 'mssql-async';
import { Book, CreateBookDto, UpdateBookDto } from 'src/interface';

@Injectable()
export class BooksService {
  private Db: Db;
  constructor() {
    this.Db = new Db({
      server: 'INBAAVVMMSUSQL',
      user: 'msu_user',
      password: 'Password@123',
      database: 'ContosoRetailDW',
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    });
    console.log('Connected to database');
  }

  async getBooks(): Promise<any> {
    const res = await this.Db.getall('select * from books');
    return res;
  }

  async addBook(book: CreateBookDto): Promise<number> {
    // const insertId = await this.Db.insert('INSERT INTO books () VALUES (@name)', { name: 'Mike' })

     const res = await this.Db.insert(
      
       `insert into books (id, title, author, price, rating) values (@id, @title, @author, @price, @rating)`,
     {id: book.id, title: book.title, author: book.author, price: book.price, rating: book.rating});
    return res;
  }

  // async deleteBook(bookId: number) {
  //   const res = await this.Db.delete(`delete from books where id = ${bookId}`);
  //   return res;
  // }

  async updateBook(bookId: number, book: UpdateBookDto) {
    let query = 'update books set ';
    query += Object.keys(book)
      .map((key) => `${key} = ${book[key]}`)
      .join(', ');
    query += ` where id = ${bookId}`;
    console.log(query);
    const res = await this.Db.update(query);
    return res;
  }
}

/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateBookDto, UpdateBookDto } from 'src/interface';
  import { BooksService } from 'src/services/books.service';
  
  @Controller('books')
  export class BooksController {
    constructor(private booksService: BooksService) {}
  
    @Get()
    async getBooks() {
      const books = await this.booksService.getBooks();
      return books;
    }
  
    @Get('new')
    getNewBooks() {
      return { newBooks: ['The new earth', 'The monk who sold his ferrari'] };
    }
  
    @Post()
    async addBook(@Body() data: CreateBookDto) {
      const res = await this.booksService.addBook(data);
      return `New book with id ${res} successfully created`;
    }
  
    // @Delete(':bookId')
    // async deleteBook(@Param('bookId') id: string) {
    //   const res = await this.booksService.deleteBook(parseInt(id));
    //   return `${res} records deleted successfully!`;
    // }
  
    @Put(':bookId')
    async updateBook(@Param('bookId') id: string, @Body() data: UpdateBookDto) {
      const res = await this.booksService.updateBook(parseInt(id), data);
      return res;
    }
  }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from "../../services/book.service";
import { Book } from "../../models/book";


@Component({
    selector: 'books',
    templateUrl: './books.component.html'
})

export class BooksComponent implements OnInit {

    books: Book[];
    book: Book;
    error: any;

    constructor(private router: Router,
        private bookService: BookService) {
    }

    ngOnInit() {
        this.getAll();
    }

    getAll() {
        this.bookService.getAll()
            .then(books => this.books = books)
            .catch(error => this.error = error);
    }
   
    viewDetail(book: Book) {
        this.book = book;
    }

    gotoForm(id) {
        this.router.navigate(['/book', id]);
    }

    delete(book: Book, event: any) {
        event.stopPropagation();
        this.bookService
            .delete(book)
            .then(response => {
                this.books = this.books.filter(b => b !== book);
                if (this.book === book) 
                    this.book = null;
            })
            .catch(error => this.error = error);
    }
}
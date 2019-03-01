import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from "../../models/book";
import { BookService } from "../../services/book.service";

@Component({
    selector: 'book-form',
    templateUrl: './book-form.component.html'
})

export class BookFormComponent implements OnInit {
    @Input() book: Book;
    updateMode = false;
    error: any;

    constructor(
        private bookService: BookService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id']; 
            if (id === '') {
                this.updateMode = true;
                this.book = new Book();
            } else {
                this.updateMode = false;
                this.bookService.get(id)
                    .then(book => this.book = book);
            }
        });
    }

    save() {
        this.bookService
            .save(this.book)
            .then(book => {
                this.book = book;
                this.goBack();
            })
            .catch(error => this.error = error); 
    }

    goBack() {
        window.history.back();
    }
}
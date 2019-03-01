import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Book } from "../models/book";

@Injectable()
export class BookService {

    private _bookStoreApi = '/api/Books';

    constructor(private http: Http) { }

    getAll(): Promise<Book[]> {
        return this.http.get(this._bookStoreApi)
            .toPromise()
            .then(response => response.json())
            .catch(error => Promise.reject(error.message || error));
    }

    get(id: Number) {
        return this.http.get(this._bookStoreApi + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(error => Promise.reject(error.message || error));
    }

    save(book: Book): Promise<Book> {
        if (book.bookId)
            return this.put(book);
        return this.post(book);
    }

    delete(book: Book) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this._bookStoreApi}/${book.bookId}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(error => Promise.reject(error.message || error));
    }

    private post(book: Book): Promise<Book> {
        return this.http
            .post(this._bookStoreApi, JSON.stringify(book), {
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .toPromise()
            .then(response => response.json().data)
            .catch(error => Promise.reject(error.message || error));
    }

    private put(book: Book) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this._bookStoreApi}/${book.bookId}`;

        return this.http
            .put(url, JSON.stringify(book), { headers: headers })
            .toPromise()
            .then(() => book)
            .catch(error => Promise.reject(error.message || error));
    }
}
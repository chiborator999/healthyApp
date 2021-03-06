import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  headers: HttpHeaders;

  private createBook = environment.apiUrl + '/Book/Create';
  private updateBook = environment.apiUrl + '/Book/Update';
  private removeBook = environment.apiUrl + '/Book/Remove';
  private getBookById = environment.apiUrl + '/Book/GetById';
  private getAllBooks = environment.apiUrl + '/Book/GetAll';

  constructor(private http: HttpClient) { 
    let authToken = localStorage.getItem('token');
    this.headers =  new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE'])
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'Bearer ' + authToken);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.createBook, data, {headers: this.headers});
  }

  update(data: any): Observable<any> {
    return this.http.put(this.updateBook, data, {headers: this.headers});
  }

  remove(bookId: any): Observable<any> {
    return this.http.delete(this.removeBook + '?bookId=' + bookId, {headers: this.headers});
  }

  getById(bookId: any): Observable<any> {
    return this.http.get(this.getBookById + '?bookId=' + bookId, {headers: this.headers});
  }

  getAll(): Observable<any> {
    return this.http.get(this.getAllBooks, {headers: this.headers});
  }
}
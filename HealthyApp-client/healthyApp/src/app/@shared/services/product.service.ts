import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headers: HttpHeaders;

  private createProduct = environment.apiUrl + '/Product/Create';
  private updateProduct = environment.apiUrl + '/Product/Update';
  private removeProduct = environment.apiUrl + '/Product/Remove';
  private getProductById = environment.apiUrl + '/Product/GetById';
  private getAllProducts = environment.apiUrl + '/Product/GetAll';

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
    return this.http.post(this.createProduct, data, {headers: this.headers});
  }

  update(data: any): Observable<any> {
    return this.http.put(this.updateProduct, data, {headers: this.headers});
  }

  remove(productId: any): Observable<any> {
    return this.http.delete(this.removeProduct + '?productId=' + productId, {headers: this.headers});
  }

  getById(productId: any): Observable<any> {
    return this.http.get(this.getProductById + '?productId=' + productId, {headers: this.headers});
  }

  getAll(): Observable<any> {
    return this.http.get(this.getAllProducts, {headers: this.headers});
  }
}
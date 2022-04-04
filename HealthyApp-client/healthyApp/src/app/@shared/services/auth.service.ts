import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;

  private loginPath = environment.apiUrl + '/Identity/Login';
  private registerPath = environment.apiUrl + '/Identity/Register';

  constructor(private http: HttpClient) { 
    let authToken = sessionStorage.getItem('token');
    this.headers =  new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE'])
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'Bearer ' + authToken);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.loginPath, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(this.registerPath, data);
  }

  saveToken(token: any) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}

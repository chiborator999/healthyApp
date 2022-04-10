import { Injectable } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() isUserLoggedIn = new EventEmitter<boolean>();
  headers: HttpHeaders;
  accessToken = 'token';

  private loginPath = environment.apiUrl + '/Identity/Login';
  private registerPath = environment.apiUrl + '/Identity/Register';

  constructor(private http: HttpClient) { 
    let authToken = sessionStorage.getItem(this.accessToken);
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

  logout() {
    localStorage.removeItem(this.accessToken);
    localStorage.removeItem('isLoggedIn');
  }

  saveToken(token: any) {
    localStorage.setItem(this.accessToken, token);
    localStorage.setItem("isLoggedIn", "true");
    // sessionStorage.setItem(this.accessToken, token);
  }

  getToken() {
    return localStorage.getItem(this.accessToken);
  }

  getUserData(): void {
    if (this.isAuthenticated()) {
      let token = localStorage.getItem(this.accessToken);
      let decodedToken = jwt_decode(`${token}`);
      console.log(decodedToken)
    }
  }

  isAuthenticated() {
    if (this.getToken()) {
      this.isUserLoggedIn.emit(true);
      return true;
    }
    return false;
  }
}

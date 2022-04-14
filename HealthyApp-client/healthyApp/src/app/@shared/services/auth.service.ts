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
  private getUserPath = environment.apiUrl + '/Identity/GetUser';
  private updateUserPath = environment.apiUrl + '/Identity/UpdateUser';
  private addExerciseToUserPath = environment.apiUrl + '/Identity/AddExerciseToUser';
  private addMealToUserPath = environment.apiUrl + '/Identity/AddMealToUser';

  constructor(private http: HttpClient) { 
    let authToken = localStorage.getItem(this.accessToken);
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

  updateUser(data: any): Observable<any> {
    return this.http.put(this.updateUserPath, data, {headers: this.headers});
  }

  getUser(userId: any): Observable<any> {
    return this.http.get(this.getUserPath + '?userId=' + userId, {headers: this.headers});
  }

  getUserName(): string {
    let userData = this.getUserData();
    let fullName = `${userData.firstName} ${userData.lastName}`;
    return fullName;
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

  getUserData(): any {
    if (this.isAuthenticated()) {
      let token = localStorage.getItem(this.accessToken);
      let decodedToken = jwt_decode(`${token}`);
      return decodedToken;
    }
  }

  isAuthenticated() {
    if (this.getToken()) {
      this.isUserLoggedIn.emit(true);
      return true;
    }
    return false;
  }

  addExerciseToUser(data: any): Observable<any> {
    return this.http.post(this.addExerciseToUserPath, data, {headers: this.headers});
  }

  addMealToUser(data: any): Observable<any> {
    return this.http.post(this.addMealToUserPath, data, {headers: this.headers});
  }
}

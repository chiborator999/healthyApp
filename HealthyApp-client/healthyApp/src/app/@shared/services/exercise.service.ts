import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  headers: HttpHeaders;

  private createExercise = environment.apiUrl + '/Exercise/Create';
  private updateExercise = environment.apiUrl + '/Exercise/Update';
  private removeExercise = environment.apiUrl + '/Exercise/Remove';
  private getExerciseById = environment.apiUrl + '/Exercise/GetById';
  private getAllExercises = environment.apiUrl + '/Exercise/GetAll';
  private getUserExercisesPath = environment.apiUrl + '/Identity/GetUserExercises';

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
    return this.http.post(this.createExercise, data, {headers: this.headers});
  }

  update(data: any): Observable<any> {
    return this.http.post(this.updateExercise, data, {headers: this.headers});
  }

  remove(exerciseId: any): Observable<any> {
    return this.http.delete(this.removeExercise + '?exerciseId=' + exerciseId, {headers: this.headers});
  }

  getById(exerciseId: any): Observable<any> {
    return this.http.get(this.getExerciseById + '?exerciseId=' + exerciseId, {headers: this.headers});
  }

  getAll(): Observable<any> {
    return this.http.get(this.getAllExercises, {headers: this.headers});
  }

  getUserExercise(userId: any): Observable<any> {
    return this.http.get(this.getUserExercisesPath + '?userId=' + userId, {headers: this.headers});
  }
}
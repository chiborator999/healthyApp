import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  headers: HttpHeaders;

  private createMeal = environment.apiUrl + '/Meal/Create';
  private updateMeal = environment.apiUrl + '/Meal/Update';
  private removeMeal = environment.apiUrl + '/Meal/Remove';
  private getMealById = environment.apiUrl + '/Meal/GetById';
  private getMealKCalById = environment.apiUrl + '/Meal/GetMealKCal';
  private getMealFatKCalById = environment.apiUrl + '/Meal/GetMealFatKCal';
  private getMealProteinKCalById = environment.apiUrl + '/Meal/GetMealProteinKCal';
  private getMealCarbohydrateKCalById = environment.apiUrl + '/Meal/GetMealCarbohydrateKCal';
  private getAllMeals = environment.apiUrl + '/Meal/GetAll';

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
    return this.http.post(this.createMeal, data, {headers: this.headers});
  }

  update(data: any): Observable<any> {
    return this.http.post(this.updateMeal, data, {headers: this.headers});
  }

  remove(mealId: any): Observable<any> {
    return this.http.delete(this.removeMeal + '?mealId=' + mealId, {headers: this.headers});
  }

  getById(mealId: any): Observable<any> {
    return this.http.get(this.getMealById + '?mealId=' + mealId, {headers: this.headers});
  }

  getAll(): Observable<any> {
    return this.http.get(this.getAllMeals, {headers: this.headers});
  }
}
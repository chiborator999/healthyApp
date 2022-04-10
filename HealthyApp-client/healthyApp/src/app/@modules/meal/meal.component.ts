import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'; 
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { MealService } from 'src/app/@shared/services/meal.service';
import { MealResponseModule } from 'src/app/@shared/models/response/meal-response/meal-response.module';
import { Observable, subscribeOn, Subscription } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['mealType', 'mealCategory', 'products', 'kCal', 'action'];
  loading: boolean = false;
  meals: MealResponseModule[];
  products: any;
  isUserLoggedIns: boolean;
  userData: any;
  kcalMealList: Array<any> = [];
  mealsIds: Array<any> = [];
  fullName: any;

  @ViewChild(MatSort) sort!: MatSort;;
    
  constructor(
    private mealService: MealService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
    ) { }
    
    ngOnInit(): void {
      this.userData = this.authService.getUserData();
      this.fullName = `${this.userData.firstName} ${this.userData.lastName}`
      this.getData();
  }

getProductsName(products: Array<any>) {
 let result = products.map(p => p.name);
 return result;
}  

getMealCategory(enumTypeNumber: any): string {
  let category = "";
  switch(enumTypeNumber) {
    case 0: 
      category = "Vegan";
      break; 
    case 1: 
      category = "Vegetarian";
      break;
    case 2: 
      category = "Pescetarian";
      break;
    case 3: 
      category = "Meat";
      break;
  }
return category;
}

getMealType(enumTypeNumber: any): string {
  let type = "";
  switch(enumTypeNumber) {
    case 0: 
      type = "Breakfast";
      break; 
    case 1: 
      type = "Lunch";
      break;
    case 2: 
      type = "Dinner";
      break;
  }
 return type;
}

sortDataAccsesor(item: any, property: any){
  switch (property) { 
    case 'title': return item.title.toUpperCase();
    case 'author': return item.title.toUpperCase();
    case 'url': return item.title.toUpperCase();
    default: return item[property];
  }
}

getData(){
    this.mealService.getAll().subscribe(response => {
      this.meals = response as MealResponseModule[]; 
      this.mealsIds = this.meals.map(m => m.id);
      this.getMealKCal(this.mealsIds);
      // this.getMealKCalFromInnerList(3);
      this.dataSource = new MatTableDataSource(this.meals);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => this.sortDataAccsesor(item, property);  
      this.loading = false;
    })          

    // },
    // error => {
    //   this.errorHandler.handleRequestError(error);
    //   this.loading = false;
    // });
  }

  getMealKCal(mealsIds:  Array<any>) {
    let cal = "";
    let id = mealsIds[1];
    this.mealService.getKCalById(id).subscribe(response => {
      cal = response
      console.log(cal)
    })
  }

  // getMealKCal(mealsIds: Array<any>){  
  //   let i = mealsIds.length;
  //   mealsIds.forEach(m => {
  //    let res = this.mealService.getKCalById(m).subscribe({
  //       next: response => {
  //           this.kcalMealList.push({
  //             id: m,
  //             kcal: response
  //           });
  //           i = i - 1;
  //       },
  //       error: error => {
  //         this.errorHandler.handleRequestError(error);
  //         console.log(error)
  //       },
  //       complete: () => {  
  //         if(i === 0){
  //           res.unsubscribe()
  //         }
  //       }
  //     }
  //   )}
  //   )
  // }

  // getMealKCalFromInnerList(mealId: any) {
  //   console.log(mealId);
  //   console.log(this.kcalMealList);
  //   this.kcalMealList.filter(m => console.log(m));
  //   let kcal = this.kcalMealList[0];

  //   console.log(kcal)
  // }

  addToFavarites(e: any) {
  
  }
}


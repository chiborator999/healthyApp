import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { MealService } from 'src/app/@shared/services/meal.service';
import { MealResponseModule } from 'src/app/@shared/models/response/meal-response/meal-response.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';

@Component({
  selector: 'app-my-day-meal',
  templateUrl: './my-day-meal.component.html',
  styleUrls: ['./my-day-meal.component.scss']
})

export class MyDayMealComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['mealType', 'mealCategory', 'products', 'kCal', 'action'];
  loading: boolean = false;
  meals: MealResponseModule[];
  products: any;
  isUserLoggedIns: boolean;
  userData: any;
  mealsIds: Array<any> = [];
  fullName: any;
  userId: any;
  mealsKCalList: any;
  mealsTotalKCal: any;


  @ViewChild(MatSort) sort!: MatSort;;
    
  constructor(
    private mealService: MealService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private errorHandler: ErrorHandlerService,
    ) { }
    
    ngOnInit(): void {
      this.userData = this.authService.getUserData();
      this.userId = this.userData.id;
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
    case 'Meal Type': return item.title.toUpperCase();
    case 'Meal Category': return item.title.toUpperCase();
    default: return item[property];
  }
}

getData(){
    this.mealService.getUserMeals(this.userId).subscribe(response => {
      this.meals = response as MealResponseModule[];
      this.mealsIds = this.meals.map(m => m.id);
      this.mealsKCalList = this.meals.map(m => m.totalKCal);
      this.mealsTotalKCal = this.getTotalDayMealsKCal(this.mealsKCalList);
      this.dataSource = new MatTableDataSource(this.meals);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => this.sortDataAccsesor(item, property);  
      this.loading = false;
    })
  }

  getTotalDayMealsKCal(kCalArray: Array<string>): number {
    var sumTotalKCal = kCalArray.reduce((acc, cur) => acc + Number(cur), 0);
    return sumTotalKCal;
  }

  delete(element:any){
    let result = confirm(`You are about to delete ${element.title}\n\n Are you sure?`);
    if(result){
      this.mealService.remove(element.id).subscribe({
        next: () => {
          this.getData();
          this.snackbar.open(`successful delete meal with id: ${element.id}`, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'successSnackbar'
          });
        },
        error: error => {
          this.errorHandler.handleRequestError(error);
          console.log(error)
        },
      })
    }
  }
}
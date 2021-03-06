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
    private snackbar: MatSnackBar,
    private errorHandler: ErrorHandlerService,
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
    case 'Meal Type': return item.title.toUpperCase();
    case 'Meal Category': return item.title.toUpperCase();
    case 'Products': return item.title.toUpperCase();
    case 'KCal': return item.title.toUpperCase();
    default: return item[property];
  }
}

getData(){
    this.mealService.getAll().subscribe(response => {
      this.meals = response as MealResponseModule[];
      this.mealsIds = this.meals.map(m => m.id);
      this.dataSource = new MatTableDataSource(this.meals);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => this.sortDataAccsesor(item, property);  
      this.loading = false;
    })
  }

  addMealToUser(elementId: any) {
    let data = { mealId: elementId, userId: this.userData.id }
    this.authService.addMealToUser(data).subscribe({
      next: () => {
        this.snackbar.open(`successful added meal with id: ${elementId} to your day meals`, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'successSnackbar'
        });
      },
      error: error => {
        this.errorHandler.handleRequestError(error);
        this.snackbar.open(`Meal cannot be added to: ${this.fullName} meals`, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'dangerSnackbar'
        });
        console.log(error)
      },
    })
  }
}


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
import { ProductResponseModule } from 'src/app/@shared/models/response/product-response/product-response.module';

@Component({
  selector: 'app-admin-meal',
  templateUrl: './admin-meal.component.html',
  styleUrls: ['./admin-meal.component.scss']
})
export class AdminMealComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['mealType', 'mealCategory', 'products', 'kCal', 'action'];
  loading: boolean = false;
  meals: MealResponseModule[];
  products: any;
  userData: any;

  @ViewChild(MatSort) sort!: MatSort;;
  
  constructor(
    private router: Router,
    private mealService: MealService,
    private errorHandler: ErrorHandlerService,
    private snackbar: MatSnackBar,
    private authService: AuthService,
  ) { }
    
  ngOnInit(): void {
    this.userData = this.authService.getUserData();
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
      case 'mealType': return item.title.toUpperCase();
      case 'mealCategory': return item.title.toUpperCase();
      default: return item[property];
    }
  }

  getData(){
      this.mealService.getAll().subscribe(response => {
        this.meals = response as MealResponseModule[]; 
        this.dataSource = new MatTableDataSource(this.meals);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => this.sortDataAccsesor(item, property);  
        this.loading = false;
      })
  }

  add() {
    this.router.navigate(['/addMeal']);
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

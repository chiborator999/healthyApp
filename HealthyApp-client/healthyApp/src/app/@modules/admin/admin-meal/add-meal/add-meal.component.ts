import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { MealService } from 'src/app/@shared/services/meal.service';
import { ProductService } from 'src/app/@shared/services/product.service';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})

export class AddMealComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = true;
  userData: any;
  products: any;
  productsList: Array<any> = [];

  constructor( private router: Router,
    private mealService: MealService,
    private productService: ProductService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private snackbar: MatSnackBar,
  ) {
      this.myForm = new FormGroup({
        mealType: new FormControl("", Validators.required),
        mealCategory: new FormControl("",Validators.required),
        products: new FormControl("",Validators.required),
    });
  }
    
  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.productService.getAll().subscribe(response => {
      this.products = response;
    })
    this.loading = false;
  }

  getSelectedValue(element: any) {
    console.log(element)
    if(element){
      this.productsList.push({ProductId: element.id});
    }
  }

  onSubmit(data: any): void{
    this.mealService.create({MealType: data.mealType, MealCategory: data.mealCategory, Products: this.productsList })
      .subscribe({ 
        next: response => {
          this.snackbar.open(`${response}`, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'successSnackbar'
          });
          this.router.navigate(['/adminMeal'])
        },
        error: error => {
          this.errorHandler.handleRequestError(error);
          console.log(error)
        }
    });
  }
}
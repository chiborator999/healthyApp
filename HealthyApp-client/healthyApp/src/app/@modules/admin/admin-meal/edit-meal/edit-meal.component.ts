import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { MealService } from 'src/app/@shared/services/meal.service';
import { ProductService } from 'src/app/@shared/services/product.service';
import { MatFormField } from '@angular/material/form-field';
import { MealResponseModule } from 'src/app/@shared/models/response/meal-response/meal-response.module';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.scss']
})

export class EditMealComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = true;
  userData: any;
  products: Array<any> = [];
  productsList: Array<any> = [];
  mealProductsIds: Array<any> = [];
  meal: MealResponseModule;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
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
    let id = this.route.snapshot.params['id'];
    if(id){
      this.mealService.getById(id).subscribe(responce =>{
        this.meal = responce;
        this.mealProductsIds = this.meal.products.map(p => p.id);
        this.myForm = new FormGroup({
          mealType: new FormControl(this.meal.mealType),
          mealCategory: new FormControl(this.meal.mealCategory),
          products: new FormControl(this.meal.products),
        })
      })
    }

    this.productService.getAll().subscribe(response => {
      this.products = response;
    })

    this.loading = false;
  }

  isSelected(productId: any){
    if(this.mealProductsIds.find(p => p === productId)){
      return true;
    }
    return false;
  }

  getSelectedValue(element: any, productId: any) {
    if(element.target.checked === true){
      console.log(element)
      this.productsList.push({ProductId: productId});
      console.log(this.productsList)
    }
    else {

    }
  }

  onSubmit(data: any): void{
    data.products = this.productsList;
    console.log(data)
    this.mealService.update({Id: this.meal.id, MealType: data.mealType, MealCategory: data.mealCategory, Products: data.products })
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
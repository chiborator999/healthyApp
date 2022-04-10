import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { ProductService } from 'src/app/@shared/services/product.service';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = true;
  userData: any;

  constructor( private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private snackbar: MatSnackBar,
    ) {
      this.myForm = new FormGroup({
        name: new FormControl("", Validators.required),
        kCal: new FormControl("",Validators.required),
        fat: new FormControl("",Validators.required),
        protein: new FormControl("",Validators.required),
        carbohydrate: new FormControl("",Validators.required),
      });
    }
    
    ngOnInit(): void {
      this.userData = this.authService.getUserData();
      this.loading = false;
    }

  onSubmit(data: any): void{
    this.productService.create({Name: data.name, KCal: data.kCal, 
                                Fat: data.fat, Protein: data.protein, 
                                Carbohydrate: data.carbohydrate })
      .subscribe({ 
        next: response => {
          this.snackbar.open(`${response}`, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'successSnackbar'
          });
          this.router.navigate(['/adminProduct'])
        },
        error: error => {
          this.errorHandler.handleRequestError(error);
          console.log(error)
        }
    });
  }
}
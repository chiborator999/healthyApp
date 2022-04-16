import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { ProductService } from 'src/app/@shared/services/product.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ProductResponseModule } from 'src/app/@shared/models/response/product-response/product-response.module';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})

export class EditProductComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = true;
  userData: any;
  product: ProductResponseModule;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
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
    let id = this.route.snapshot.params['id'];
    if(id){
      this.productService.getById(id).subscribe(responce =>{
        this.product = responce;
        this.myForm = new FormGroup({
          name: new FormControl(this.product.name),
          kCal: new FormControl(this.product.kCal),
          fat: new FormControl(this.product.fat),
          protein: new FormControl(this.product.protein),
          carbohydrate: new FormControl(this.product.carbohydrate),
        })
      })
    }
    this.loading = false;
  }

  onSubmit(data: any): void{
    this.productService.update({Id: this.product.id, Name: data.name, KCal: data.kCal, 
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
      }
    );
  }
}
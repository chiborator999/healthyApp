import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'; 
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { MealResponseModule } from 'src/app/@shared/models/response/meal-response/meal-response.module';
import { ProductResponseModule } from 'src/app/@shared/models/response/product-response/product-response.module';
import { ProductService } from 'src/app/@shared/services/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})

export class AdminProductComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'kCal', 'fat', 'protein', 'carbohydrate', 'action'];
  loading: boolean = false;
  products: any;
  userData: any;

  @ViewChild(MatSort) sort!: MatSort;;
  
  constructor(
    private productService: ProductService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
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

  sortDataAccsesor(item: any, property: any){
    switch (property) { 
      case 'Name': return item.title.toUpperCase();
      case 'KCal': return item.title.toUpperCase();
      case 'Fat': return item.title.toUpperCase();
      case 'Protein': return item.title.toUpperCase();
      case 'Carbohydrate': return item.title.toUpperCase();
      default: return item[property];
    }
  }

  getData(){
    this.productService.getAll().subscribe(response => {
      this.products = response as ProductResponseModule[]; 
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => this.sortDataAccsesor(item, property);  
      this.loading = false;
    })
  }

  add(){
    this.router.navigate(['/addProduct']);
  }

  delete(element:any){
    let result = confirm(`You are about to delete ${element.title}\n\n Are you sure?`);
    if(result){
      this.productService.remove(element.id).subscribe({
        next: () => {
          this.getData();
          this.snackbar.open(`successful delete product with id: ${element.id}`, 'X', {
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
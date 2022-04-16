import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'; 
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { BookService } from 'src/app/@shared/services/book.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'author', 'url', 'action'];
  loading: boolean = false;
  books: any;
  isUserLoggedIns: boolean;
  userData: any;
  isAdmin: boolean;
  https = 'https://'

  @ViewChild(MatSort) sort!: MatSort;;
   
  constructor(
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private snackbar: MatSnackBar,
    private bookService: BookService,
    private authService: AuthService,    
    ) { }
    
  ngOnInit(): void {;
    this.authService.isUserAdmin.subscribe( value => {
      this.userData = value;
      if(this.userData.role === 'Admin'){
        this.isAdmin = true;
      }
    });
    this.getData();
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
      this.bookService.getAll().subscribe(response => {
        this.books = response; 
        this.dataSource = new MatTableDataSource(this.books); 
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => this.sortDataAccsesor(item, property);  
        this.loading = false;
      })
  }

  add() {
    this.router.navigate(['/addBook']);
  }

  edit(element: any) {
    this.router.navigate(['/editBook', element.id]);
  }
    
    
  delete(element:any){
    let result = confirm(`You are about to delete ${element.title}\n\n Are you sure?`);
    if(result){
      this.bookService.remove(element.id).subscribe({
        next: () => {
          this.getData();
          this.snackbar.open(`successful delete book with id: ${element.id}`, 'X', {
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

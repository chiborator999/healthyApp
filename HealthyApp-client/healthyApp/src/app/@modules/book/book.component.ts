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

  @ViewChild(MatSort) sort!: MatSort;;
  
  
  constructor(
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private snackbar: MatSnackBar,
    private bookService: BookService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,   
    
    ) { }
    
    ngOnInit(): void {
      this.userData = this.authService.getUserData();
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
      console.log(this.books)
      this.dataSource = new MatTableDataSource(this.books); 
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

add() {
  console.log("add");
}

edit(element: any) {
  console.log("edit");
}

delete(element: any) {
  console.log("delete");
}

  // add(){
  //   this.router.navigate(['book/add']);
  // }

  // edit(element: any){
  //   this.router.navigate(['book/edit', element.id]);
  // }
  
  // delete(element:any){
  //   let result = confirm(`You are about to delete ${element.title}\n\n Are you sure?`);
  //   if(result){
  //     this.bookService.deleteHoliday(element.id).subscribe(response => {
  //       this.getData();
  //       this.snackbar.open(`${response}`, 'X', {
  //         horizontalPosition: 'center',
  //         verticalPosition: 'bottom',
  //         panelClass: 'successSnackbar'
  //       });
  //       this.loading = false;
  //     }, error => {
  //         this.errorHandlerService.handleRequestError(error);
  //         this.loading = false;
  //     });  
  //     }        
  //  }
}

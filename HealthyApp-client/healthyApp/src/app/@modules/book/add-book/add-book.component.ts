import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { BookService } from 'src/app/@shared/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = true;
  userData: any;

  constructor( private router: Router,
    private bookService: BookService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private snackbar: MatSnackBar,
  ) {
      this.myForm = new FormGroup({
        title: new FormControl("", Validators.required),
        author: new FormControl("",Validators.required),
        url: new FormControl("",Validators.required),
    });
  }
    
  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.loading = false;
  }

  onSubmit(data: any): void{
    this.bookService.create({Title: data.title, Author: data.author, Url: data.url, PerformerId: this.userData.id })
      .subscribe({ 
        next: response => {
          this.snackbar.open(`${response}`, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'successSnackbar'
          });
          this.router.navigate(['/book'])
        },
        error: error => {
          this.errorHandler.handleRequestError(error);
          console.log(error)
        }
      }
    );
  }
}
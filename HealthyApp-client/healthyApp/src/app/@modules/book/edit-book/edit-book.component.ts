import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { BookService } from 'src/app/@shared/services/book.service';
import { BookResponseModule } from 'src/app/@shared/models/response/book-response/book-response.module';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})

export class EditBookComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = true;
  userData: any;
  book: BookResponseModule;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
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
    let id = this.route.snapshot.params['id'];
    if(id){
      this.bookService.getById(id).subscribe(responce =>{
        this.book = responce;
        this.myForm = new FormGroup({
          title: new FormControl(this.book.title),
          author: new FormControl(this.book.author),
          url: new FormControl(this.book.url),
        })
      })
    }
    this.loading = false;
  }

  onSubmit(data: any): void{
    this.bookService.update({Id: this.book.id, Title: data.title, Author: data.author, Url: data.url })
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
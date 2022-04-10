import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder,
    private authServise: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private errorHandler: ErrorHandlerService
    ) { 
      this.loginForm = this.fb.group({
        'username': ['', [Validators.required]],
        'password': ['', [Validators.required]]
      })
    }
    
  ngOnInit(): void {
  }

  login() {
    this.authServise.login(this.loginForm.value).subscribe({
      next: response => {
        this.authServise.saveToken(response['token']);
        this.authServise.isUserLoggedIn.emit(true);
        this.router.navigate(['/']);
        this.snackbar.open(`login successful`, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'successSnackbar'
        });
      },
      error: error => {
        this.errorHandler.handleRequestError(error);
        console.log(error)
      },
      complete: () => {
        
      }
    })}
  }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private snackbar: MatSnackBar,
    ) { 
    this.registerForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'age': ['', [Validators.required]],
      'gender': ['', [Validators.required]],
      'weight': ['', [Validators.required]],
      'height': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snackbar.open(`successful register in healtyApp`, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'successSnackbar'
        });
        this.router.navigate(['/login']);
      },
      error: error => {
        this.errorHandler.handleRequestError(error);
        console.log(error)
      }
    })
  }
}
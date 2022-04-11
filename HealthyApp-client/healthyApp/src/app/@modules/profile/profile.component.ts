import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userData: any;
  fullName: any;
  userViewModel: any;
  userName: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private snackbar: MatSnackBar,
    ) { 
    this.profileForm = this.fb.group({
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
    this.userData = this.authService.getUserData();
    this.userName = this.userData.username;
    this.fullName = `${this.userData.firstName} ${this.userData.lastName}`

    this.authService.getUser(this.userData.id).subscribe(response => {
      this.userViewModel = response;
      this.profileForm = new FormGroup({
        email: new FormControl(this.userViewModel.email),
        firstName: new FormControl(this.userViewModel.firstName),
        lastName: new FormControl(this.userViewModel.lastName),
        age: new FormControl(this.userViewModel.age),
        gender: new FormControl(this.userViewModel.gender),
        weight: new FormControl(this.userViewModel.weight),
        height: new FormControl(this.userViewModel.height),
      })
    })
  }

  update(data: any): void{
    this.authService.updateUser({UserName: this.userName, Email: data.email, 
                                FirstName: data.firstName, LastName: data.lastName,
                                Age: data.age, Gender: data.gender, Weight: data.weight, Height: data.height})
      .subscribe({ 
        next: response => {
          this.snackbar.open(`${response}`, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'successSnackbar'
          });
          this.router.navigate(['/dashboard'])
        },
        error: error => {
          this.errorHandler.handleRequestError(error);
          console.log(error)
        }
      }
    );
  }
}

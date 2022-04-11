import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ExerciseService } from 'src/app/@shared/services/exercise.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})

export class AddExerciseComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = true;
  userData: any;

  constructor( private router: Router,
    private exerciseService: ExerciseService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private snackbar: MatSnackBar,
  ) {
      this.myForm = new FormGroup({
        name: new FormControl("", Validators.required),
        kCalSpent: new FormControl("",Validators.required),
    });
  }
    
  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.loading = false;
  }

  onSubmit(data: any): void{
    this.exerciseService.create({Name: data.name, kCalSpent: data.kCalSpent })
      .subscribe({ 
        next: response => {
          this.snackbar.open(`${response}`, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'successSnackbar'
          });
          this.router.navigate(['/adminExercise'])
        },
        error: error => {
          this.errorHandler.handleRequestError(error);
          console.log(error)
        }
    });
  }
}
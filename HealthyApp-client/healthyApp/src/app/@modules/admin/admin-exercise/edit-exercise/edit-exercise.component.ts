import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ExerciseService } from 'src/app/@shared/services/exercise.service';
import { ExeciseResponseModule } from 'src/app/@shared/models/response/execise-response/execise-response.module';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})

export class EditExerciseComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = true;
  userData: any;
  exercise: ExeciseResponseModule;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
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
    let id = this.route.snapshot.params['id'];
    if(id){
      this.exerciseService.getById(id).subscribe(responce =>{
        this.exercise = responce;
        this.myForm = new FormGroup({
          name: new FormControl(this.exercise.name),
          kCalSpent: new FormControl(this.exercise.kCalSpent),
        })
      })
    }
    this.loading = false;
  }

  onSubmit(data: any): void{
    this.exerciseService.update({Id: this.exercise.id, Name: data.name, kCalSpent: data.kCalSpent })
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
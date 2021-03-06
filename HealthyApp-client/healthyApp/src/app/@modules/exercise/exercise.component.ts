import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'; 
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/@shared/services/error-handler.service';
import { ExerciseService } from 'src/app/@shared/services/exercise.service';
import { ExeciseResponseModule } from 'src/app/@shared/models/response/execise-response/execise-response.module';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})

export class ExerciseComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'kCalSpent', 'action'];
  loading: boolean = false;
  exercises: any;
  userData: any;

  @ViewChild(MatSort) sort!: MatSort;;
   
  constructor(
    private exerciseService: ExerciseService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService,  
  ) { }
    
  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.getData();
  }

  sortDataAccsesor(item: any, property: any){
    switch (property) { 
      case 'Name': return item.title.toUpperCase();
      case 'kCal Spent': return item.title.toUpperCase();
      default: return item[property];
    }
  }

  getData(){
    this.exerciseService.getAll().subscribe(response => {
      this.exercises = response as ExeciseResponseModule[]; 
      this.dataSource = new MatTableDataSource(this.exercises);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => this.sortDataAccsesor(item, property);  
      this.loading = false;
    })          
  }

  add(elementId: any) {
    let data = { exerciseId: elementId, userId: this.userData.id }
    this.authService.addExerciseToUser(data).subscribe({
      next: () => {
        this.snackbar.open(`successful added exercise with id: ${elementId} to your exercises`, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'successSnackbar'
        });
      },
      error: error => {
        this.errorHandler.handleRequestError(error);
        this.snackbar.open(`Exercise cannot be added to user with id: ${this.userData.id}`, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'dangerSnackbar'
        });
        console.log(error)
      },
    })
  }
    
  delete(element:any){
    let result = confirm(`You are about to delete ${element.title}\n\n Are you sure?`);
    if (result) {
      this.exerciseService.remove(element.id).subscribe({
        next: () => {
          this.getData();
          this.snackbar.open(`successful delete exercise with id: ${element.id}`, 'X', {
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


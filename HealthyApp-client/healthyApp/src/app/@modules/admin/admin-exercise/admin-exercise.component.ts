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
  selector: 'app-admin-exercise',
  templateUrl: './admin-exercise.component.html',
  styleUrls: ['./admin-exercise.component.scss']
})

export class AdminExerciseComponent implements OnInit {
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
      case 'kCalSpent': return item.title.toUpperCase();
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

  add() {
    this.router.navigate(['/addExercise']);
  }

  edit(element: any) {
    this.router.navigate(['/editExercise', element.id]);
  }

  delete(element:any){
    let result = confirm(`You are about to delete ${element.title}\n\n Are you sure?`);
    if(result){
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

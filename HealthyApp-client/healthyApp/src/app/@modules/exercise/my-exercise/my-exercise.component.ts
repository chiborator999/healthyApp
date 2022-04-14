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
  selector: 'app-my-exercise',
  templateUrl: './my-exercise.component.html',
  styleUrls: ['./my-exercise.component.scss']
})

export class MyExerciseComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'kCalSpent', 'action'];
  loading: boolean = false;
  exercises: any;
  userData: any;
  userId: any;
  fullName: any;
  totalKCal: any;
  totalKCalSpent: any;

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
    this.userId = this.userData.id;
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
    this.exerciseService.getUserExercise(this.userId).subscribe(response => {
      this.exercises = response as ExeciseResponseModule[]; 
      this.totalKCal = this.exercises.map((e: any) => e.kCalSpent);
      this.totalKCalSpent = this.getTotalKCalSpent(this.totalKCal);
      this.dataSource = new MatTableDataSource(this.exercises);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => this.sortDataAccsesor(item, property);  
      this.loading = false;
    })          
  }

  getTotalKCalSpent(kCalArray: Array<string>): number {
    var sumTotalKCal = kCalArray.reduce((acc, cur) => acc + Number(cur), 0);
    return sumTotalKCal;
  }
    
  delete(element:any){
    let result = confirm(`You are about to delete ${element.title}\n\n Are you sure?`);
    if(result){
      this.exerciseService.remove(element.id).subscribe({
        next: () => {
          this.getData();
          this.snackbar.open(`successful delete meal with id: ${element.id}`, 'X', {
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

  getUserFullName() {
    return this.fullName = this.authService.getUserName();
  }
}
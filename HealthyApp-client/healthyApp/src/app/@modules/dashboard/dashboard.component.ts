import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData: any;
  fullName: any;
  userViewModel: any;
  userWeight: any;
  userHeight: any;
  userAge: any;
  userGender: any;
  userBMI: any;
  BMImessage: any;
  userDailyCaloriesIntake: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();

    this.authService.getUser(this.userData.id).subscribe(response => {
      this.userViewModel = response;
      this.userWeight = this.userViewModel.weight;
      this.userHeight = this.userViewModel.height;
      this.userAge = this.userViewModel.age;
      this.userGender = this.userViewModel.gender;
      this.userBMI = this.calculateBMI(this.userWeight, this.userHeight);
      if(this.userBMI >= 18.5 && this.userBMI <= 24.9){
        this.BMImessage = "Congratulations, your weight is healthy";
      } else {
        this.BMImessage = "The higher your BMI, the higher the risk to your health, your BMI must be between 18.5 and 24.9";
      }
      this.userDailyCaloriesIntake = this.getCaloriesIntake(this.userWeight, this.userHeight, this.userAge, this.userGender);
    })
  }

  calculateBMI(weight: number, height: number): string {
    let heightMeter = height / 100;
    let BMI = weight/(heightMeter * heightMeter);
    return BMI.toFixed(2);
  }

  getUserFullName() {
    return this.fullName = this.authService.getUserName();
  }

  getCaloriesIntake(weight: number, height: number, age: number, gender: string): string {
    let calories = 0;
    if(gender.toLowerCase() === "female"){
      calories = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
    } else {
      calories = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)
    }
    return calories.toFixed(2);
  }
}


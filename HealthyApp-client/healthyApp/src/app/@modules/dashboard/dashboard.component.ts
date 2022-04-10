import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData: any;
  userFullName: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.userFullName = `${this.userData.firstName} ${this.userData.lastName}`
    console.log(this.userData)
  }
}

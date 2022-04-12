import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn: boolean;
  userData: any;
  fullName: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    }); 
    this.userData = this.authService.getUserData();
  }

  logout() {
    this.authService.logout();
  }
  
  getUserFullName() {
    return this.fullName = this.authService.getUserName();
  }
}

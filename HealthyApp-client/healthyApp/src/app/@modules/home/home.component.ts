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
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.authService.isUserAdmin.subscribe( value => {
      this.userData = value;
      if(this.userData.role === 'Admin'){
        this.isAdmin = true;
      }
    });

    this.authService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    }); 
    
  }

  logout() {
    this.authService.logout();
  }
  
  getUserFullName(): string {
    return this.fullName = this.authService.getUserName();
  }
}

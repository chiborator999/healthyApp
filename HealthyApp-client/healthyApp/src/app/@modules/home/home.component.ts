import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn: boolean;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  }); 

  
  //   let userData = this.authService.getUserData();
  //   console.log(userData)
  // }
  }

  logout() {
    this.authService.logout();
  }
}

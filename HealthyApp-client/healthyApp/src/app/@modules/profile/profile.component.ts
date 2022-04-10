import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userData: any;
  fullName: any;
  userViewModel: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
    ) { 
    this.profileForm = this.fb.group({
      'username': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'age': ['', [Validators.required]],
      'gender': ['', [Validators.required]],
      'weight': ['', [Validators.required]],
      'height': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.fullName = `${this.userData.firstName} ${this.userData.lastName}`

    this.authService.getUser(this.userData.id).subscribe(response => {
      this.userViewModel = response;
      console.log(this.userViewModel)
      this.profileForm = new FormGroup({
        username: new FormControl(this.userViewModel.userName),
        email: new FormControl(this.userViewModel.email),
        firstName: new FormControl(this.userViewModel.firstName),
        lastName: new FormControl(this.userViewModel.lastName),
        age: new FormControl(this.userViewModel.age),
        gender: new FormControl(this.userViewModel.gender),
        weight: new FormControl(this.userViewModel.weight),
        height: new FormControl(this.userViewModel.height),

      })
    })
  }

  update() {
    console.log("Update profile")
    // this.router.navigate(['/dashboard'])
  }
}

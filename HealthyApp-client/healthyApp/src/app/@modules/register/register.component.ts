import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
    ) { 
    this.registerForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]],
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
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(response =>{
      if(response){
        this.router.navigate(['/login']);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authServise: AuthService,
    ) { 
    this.loginForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.authServise.login(this.loginForm.value).subscribe(response =>{
      console.log(response);
    //   this.snackbar.open(`${response}`, 'X', {
    //     horizontalPosition: 'center',
    //     verticalPosition: 'bottom',
    //     panelClass: 'successSnackbar'
    //   });
    //   this.loading = false;
    // }, error => {
    //     // this.errorHandlerService.handleRequestError(error);
    //     this.loading = false;
    // });
      }
  )};
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './@modules/book/book.component';
import { FooterComponent } from './@modules/footer/footer.component';
import { HomeComponent } from './@modules/home/home.component';
import { LoginComponent } from './@modules/login/login.component';
import { RegisterComponent } from './@modules/register/register.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'book', component: BookComponent }
  //  path: 'createMeal', component: HomeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

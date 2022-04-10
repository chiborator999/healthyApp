import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './@modules/book/book.component';
import { DashboardComponent } from './@modules/dashboard/dashboard.component';
import { ExerciseComponent } from './@modules/exercise/exercise.component';
import { LoginComponent } from './@modules/login/login.component';
import { MealComponent } from './@modules/meal/meal.component';
import { ProfileComponent } from './@modules/profile/profile.component';
import { RegisterComponent } from './@modules/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'book', component: BookComponent },
  { path: 'meal', component: MealComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'dashboard', component: DashboardComponent },

  //  path: 'createMeal', component: HomeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

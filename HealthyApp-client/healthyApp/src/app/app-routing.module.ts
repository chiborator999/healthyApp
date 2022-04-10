import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminExerciseComponent } from './@modules/admin/admin-exercise/admin-exercise.component';
import { AdminMealComponent } from './@modules/admin/admin-meal/admin-meal.component';
import { AddProductComponent } from './@modules/admin/admin-product/add-product/add-product.component';
import { AdminProductComponent } from './@modules/admin/admin-product/admin-product.component';
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
  { path: 'adminMeal', component: AdminMealComponent },
  { path: 'adminProduct', component: AdminProductComponent },
  { path: 'adminExercise', component: AdminExerciseComponent },
  { path: 'addProduct', component: AddProductComponent },

  //  path: 'createMeal', component: HomeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

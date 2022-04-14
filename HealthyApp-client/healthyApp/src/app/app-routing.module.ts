import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExerciseComponent } from './@modules/admin/admin-exercise/add-exercise/add-exercise.component';
import { AdminExerciseComponent } from './@modules/admin/admin-exercise/admin-exercise.component';
import { AddMealComponent } from './@modules/admin/admin-meal/add-meal/add-meal.component';
import { AdminMealComponent } from './@modules/admin/admin-meal/admin-meal.component';
import { AddProductComponent } from './@modules/admin/admin-product/add-product/add-product.component';
import { AdminProductComponent } from './@modules/admin/admin-product/admin-product.component';
import { AddBookComponent } from './@modules/book/add-book/add-book.component';
import { BookComponent } from './@modules/book/book.component';
import { DashboardComponent } from './@modules/dashboard/dashboard.component';
import { ExerciseComponent } from './@modules/exercise/exercise.component';
import { MyExerciseComponent } from './@modules/exercise/my-exercise/my-exercise.component';
import { LoginComponent } from './@modules/login/login.component';
import { MealComponent } from './@modules/meal/meal.component';
import { MyDayMealComponent } from './@modules/meal/my-day-meal/my-day-meal.component';
import { ProfileComponent } from './@modules/profile/profile.component';
import { RegisterComponent } from './@modules/register/register.component';
import { AuthGuardService } from './@shared/services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'book', component: BookComponent, canActivate: [AuthGuardService] },
  { path: 'addBook', component: AddBookComponent, canActivate: [AuthGuardService] },
  { path: 'meal', component: MealComponent, canActivate: [AuthGuardService] },
  { path: 'myDayMeal', component: MyDayMealComponent, canActivate: [AuthGuardService] },
  { path: 'addMeal', component: AddMealComponent, canActivate: [AuthGuardService] },
  { path: 'exercise', component: ExerciseComponent, canActivate: [AuthGuardService] },
  { path: 'myExercise', component: MyExerciseComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'adminMeal', component: AdminMealComponent, canActivate: [AuthGuardService] },
  { path: 'adminProduct', component: AdminProductComponent, canActivate: [AuthGuardService] },
  { path: 'addProduct', component: AddProductComponent, canActivate: [AuthGuardService] },
  { path: 'adminExercise', component: AdminExerciseComponent, canActivate: [AuthGuardService] },
  { path: 'addExercise', component: AddExerciseComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

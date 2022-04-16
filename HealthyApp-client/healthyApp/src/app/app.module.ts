import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './@modules/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './@modules/login/login.component';
import { RegisterComponent } from './@modules/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './@shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http'
import { AuthGuardService } from './@shared/services/auth-guard.service';
import { ProductService } from './@shared/services/product.service';
import { MealService } from './@shared/services/meal.service';
import { BookService } from './@shared/services/book.service';
import { ExerciseService } from './@shared/services/exercise.service';
import { BookComponent } from './@modules/book/book.component';
import { AngularMaterialModule } from './core/angular-material.module';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './@modules/footer/footer.component';
import { ErrorHandlerService } from './@shared/services/error-handler.service';
import { MealComponent } from './@modules/meal/meal.component';
import { ExerciseComponent } from './@modules/exercise/exercise.component';
import { ProfileComponent } from './@modules/profile/profile.component';
import { DashboardComponent } from './@modules/dashboard/dashboard.component';
import { AdminMealComponent } from './@modules/admin/admin-meal/admin-meal.component';
import { AdminProductComponent } from './@modules/admin/admin-product/admin-product.component';
import { AdminExerciseComponent } from './@modules/admin/admin-exercise/admin-exercise.component';
import { AddProductComponent } from './@modules/admin/admin-product/add-product/add-product.component';
import { AddBookComponent } from './@modules/book/add-book/add-book.component';
import { AddExerciseComponent } from './@modules/admin/admin-exercise/add-exercise/add-exercise.component';
import { AddMealComponent } from './@modules/admin/admin-meal/add-meal/add-meal.component';
import { MyExerciseComponent } from './@modules/exercise/my-exercise/my-exercise.component';
import { MyDayMealComponent } from './@modules/meal/my-day-meal/my-day-meal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoleGuardService } from './@shared/services/role-guard.service';
import { EditExerciseComponent } from './@modules/admin/admin-exercise/edit-exercise/edit-exercise.component';
import { EditProductComponent } from './@modules/admin/admin-product/edit-product/edit-product.component';
import { EditBookComponent } from './@modules/book/edit-book/edit-book.component';
import { EditMealComponent } from './@modules/admin/admin-meal/edit-meal/edit-meal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BookComponent,
    FooterComponent,
    MealComponent,
    ExerciseComponent,
    ProfileComponent,
    DashboardComponent,
    AdminMealComponent,
    AdminProductComponent,
    AdminExerciseComponent,
    AddProductComponent,
    AddBookComponent,
    AddExerciseComponent,
    AddMealComponent,
    MyExerciseComponent,
    MyDayMealComponent,
    EditExerciseComponent,
    EditProductComponent,
    EditBookComponent,
    EditMealComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    MatTableModule,
    MatSortModule,
    FlexLayoutModule,
  ],
  providers: [
    AuthService, 
    AuthGuardService,
    ProductService,
    MealService,
    BookService,
    ExerciseService,
    ErrorHandlerService,
    RoleGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

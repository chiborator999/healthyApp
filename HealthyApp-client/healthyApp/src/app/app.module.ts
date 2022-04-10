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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BookComponent,
    FooterComponent
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
    MatSortModule
  ],
  providers: [
    AuthService, 
    AuthGuardService,
    ProductService,
    MealService,
    BookService,
    ExerciseService,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

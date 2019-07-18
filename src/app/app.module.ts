// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import {
  HomeComponent,
  MovieComponent,
  ProfileComponent,
  SignupComponent,
  LoginComponent,
  WatchComponent,
  IndexComponent,
  MyListComponent,
  ProfileManageComponent,
  SliderComponent,
  CardComponent,
  DetailCardComponent,
  HeaderComponent,
  FooterComponent,
  SubHeaderComponent,
  SignupStep1Component,
  SignupStep2Component,
  SignupStep3Component,
} from './components';

// Directives
import { FixHeaderDirective } from './directives/fix-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    SliderComponent,
    WatchComponent,
    CardComponent,
    DetailCardComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    MyListComponent,
    FixHeaderDirective,
    ProfileManageComponent,
    SubHeaderComponent,
    SignupStep1Component,
    SignupStep2Component,
    SignupStep3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

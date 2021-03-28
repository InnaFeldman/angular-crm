import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import {AppRoutingModule} from './app-routing.module';
import { AuthLayoutComponent } from './components/shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './components/shared/layouts/site-layout/site-layout.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { ConsoleLogPipe } from './pipes/console-log.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    SignUpPageComponent,
    ConsoleLogPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import { ConsoleLogPipe } from './pipes/console-log.pipe';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './components/shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './components/shared/layouts/site-layout/site-layout.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import {TokenInterceptor} from './components/shared/classes/token.interceptor';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { LoaderComponent } from './components/shared/loader/loader.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    SignUpPageComponent,
    ConsoleLogPipe,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

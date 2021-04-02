///Interceptor - to intercept http request and change it

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../../../services/auth.service";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    // To add authorization in headers
    const token = localStorage.getItem('auth-token');

    if(token){
      req = req.clone({//to update current request
        setHeaders: {//to change some headers
          Authorization: token
        }
      })
    }
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => this.handleAuthError(error)
      )
    );
  }

  ///Session of token was ended
  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if(error.status === 401){
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFaild: true
        }
      })
    }

    return throwError(error);
  }
}

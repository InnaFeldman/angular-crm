///Interceptor - to intercept http request and change it

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../../services/auth.service";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService){}

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
    return next.handle(req);
  }
}

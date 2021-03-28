import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null;

  constructor(private http: HttpClient) { }

  signUp(){}

  signIn(user: User): Observable<{token: string}>{
         //from backend
    return this.http.post<{token: string}>('/api/auth/login', user)
    .pipe(
      tap(
        ({token}) => {
          localStorage.setItem('auth-token', token)
          // this.setToken(token)
        }
      )
    )
  }
  // setToken(token: string){
  //   this.token = token;
  // }

  // getToken():string {
  //   return this.token
  // }

  // isAuthenticated(): boolean{
  //   return !!this.token
  // }

  // logout(){
  //   this,this.setToken(null)
  //   localStorage.clear()
  // }
}

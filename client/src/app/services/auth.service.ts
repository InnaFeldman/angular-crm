import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any = null;

  constructor(private http: HttpClient) { }

  signUp(user: User):Observable<User>{
    return this.http.post<User>('/api/auth/register', user)
  }

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
  setToken(token: string){
    this.token = token;
  }

  getToken():string {
    return this.token
  }

  isAuthenticated(): boolean{
    return !!this.token
  }

  logout(){
    //this.setToken(null)
    this.setToken('')
    localStorage.clear()
  }
}

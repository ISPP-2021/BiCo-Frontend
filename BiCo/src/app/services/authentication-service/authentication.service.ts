import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, tap, switchMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of } from 'rxjs';
import { User } from '../../model/user.interface';

export interface LoginForm {
  user: string;
  password: string;
};

export const JWT_NAME = 'token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm) {
    //https://stalion73.herokuapp.com/user
     console.log(this.http.post('http://localhost:8080/users', {user: loginForm.user, password: loginForm.password}).subscribe(
       response=>{
         console.log(response)
       }
     ))/*.pipe(
      map((token) => {
        console.log('token');
        localStorage.setItem(JWT_NAME, this.http.htoken);
        return token;
      })
    )*/
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }

  /*register(user: User) {
    return this.http.post<any>('/api/users', user).pipe(
      tap(user => console.log(user)),
      map(user => user)
    )
  }*/

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

}

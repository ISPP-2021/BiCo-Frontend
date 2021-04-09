import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { User } from '../../model/user.interface';
import { UserService } from 'src/app/services/user-services/user.service';
import { Router } from '@angular/router';

export interface LoginForm {
  user: string;
  password: string;
}

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // http://localhost:8080/users/login
  // http://bico-despliegue1.herokuapp.com

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  private url: string = 'http://localhost:8080';
  // private headers = {
  // 	headers: {
  // 	Authorization: this.token,
  // 	},
  // };
  login(loginForm: LoginForm) {
    return this.http
      .post<User>(`${this.url}/users/login`, {
        username: loginForm.user,
        password: loginForm.password,
      })
      .pipe(
        map((usuario) => {
          localStorage.setItem(JWT_NAME, usuario.token);

          let rol = usuario.authorities[0].authority;
          localStorage.setItem('rol', rol);

          let user_id = usuario.authorities[0].id;
          localStorage.setItem('user_id', user_id);

          window.location.reload();

          return usuario;
        })
      );
  }

  logout() {
    localStorage.clear();
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

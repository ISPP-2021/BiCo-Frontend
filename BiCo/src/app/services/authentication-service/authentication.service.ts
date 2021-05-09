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
	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelperService,
		private router: Router) { }

	private url: string = 'https://bico-despliegue3.herokuapp.com';
  	private url2: string = 'http://localhost:8080';

	login(loginForm: LoginForm): Observable<any> {

		return this.http.post<User>(`${this.url}/users/login`, { username: loginForm.user, password: loginForm.password }).pipe(
			map((usuario) => {

				localStorage.setItem(JWT_NAME, usuario.token);

				let rol = usuario.authorities[0].authority;
				localStorage.setItem("rol", rol);


				let user_id = usuario.authorities[0].id;
				localStorage.setItem("user_id", user_id);

				let username = usuario.username
				localStorage.setItem("username", username);

				window.location.reload();

				return usuario;
			})
		)
	}

	logout() {
		localStorage.clear();
	}

	registerUser(body: any): Observable<any>{
	  return this.http.post(this.url+'/users/signup/consumers', body)

	}

  registerOwner(body: any): Observable<any> {
	  return this.http.post(this.url+'/users/signup/suppliers', body)

	}

  isTokenExpired(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    if(token === null){
      return true;
    }
    return this.jwtHelper.isTokenExpired(token);
  }
}

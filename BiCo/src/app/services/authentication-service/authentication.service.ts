import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
	private url: string = 'http://bico-despliegue1.herokuapp.com';
	// private headers = {
	// 	headers: {
	// 	Authorization: this.token,
	// 	},
	// };
	login(loginForm: LoginForm) {

		return this.http.post<User>(`${this.url}/users/login`, { username: loginForm.user, password: loginForm.password }).pipe(
			map((usuario) => {
				console.log(usuario.token);
				console.log(usuario);

				localStorage.setItem(JWT_NAME, usuario.token);
				return usuario;
			})
		)
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

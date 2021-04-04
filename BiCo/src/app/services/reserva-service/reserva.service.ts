import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs'
import { Reserva } from 'src/app/model/reserva.interface'
import { map, catchError } from 'rxjs/operators';
import { JWT_NAME } from '../authentication-service/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  token: string = localStorage.getItem(JWT_NAME);
  constructor(private http: HttpClient) { }
  private url: string = 'http://bico-despliegue1.herokuapp.com/';
  private headers = {
    headers: {
      Authorization: this.token,
    },
  };

  create(reserva:Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.url + 'bookings', reserva, this.headers);
  }

  findOne(id : Number): Observable<Reserva> {
		return this.http
			.get<Reserva>(this.url + 'servises/' + id, this.headers)
			.pipe(
				catchError(this.errorHandler)
			)
	}
	errorHandler(err: HttpErrorResponse) {
		return observableThrowError(err.message)
	}

}
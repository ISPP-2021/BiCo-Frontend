import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Reserva } from 'src/app/model/reserva.interface';
import { catchError } from 'rxjs/operators';
import { JWT_NAME } from '../authentication-service/authentication.service';

@Injectable({
	providedIn: 'root',
})
export class ReservaService {
	token: string = localStorage.getItem(JWT_NAME);
	constructor(private http: HttpClient) { }
	private url: string = 'https://bico-despliegue-4.herokuapp.com/';
	// private url: string = 'http://localhost:8080/';

	private headers = {
		headers: {
			Authorization: this.token,
		}
	};

	create(id: Number, reserva: Reserva): Observable<Reserva> {
		return this.http.post<Reserva>(
			this.url + 'bookings/' + id,
			reserva,
			this.headers
		)
	}

	createFor(serviceId: Number, consumerId: Number, reserva: Reserva): Observable<Reserva> {
		return this.http.post<Reserva>(
			this.url + 'bookings/' + serviceId + '/' + consumerId,
			reserva,
			this.headers
		)
	}

	findOne(id: Number): Observable<Reserva> {
		return this.http
			.get<Reserva>(this.url + 'servises/' + id, this.headers)
			.pipe(catchError(this.errorHandler));
	}

	errorHandler(err: HttpErrorResponse) {
		return observableThrowError(err.message);
	}

	cancelBooking(id: number): Observable<Reserva> {
		return this.http
			.delete<Reserva>(this.url + 'bookings/' + id + '/cancel', this.headers)
			.pipe(catchError(this.errorHandler));
	}

	acceptBooking(id: number): Observable<Reserva> {
		return this.http
			.put<Reserva>(this.url + 'bookings/' + id + '/complete', {}, this.headers)
			.pipe(catchError(this.errorHandler));
	}
}

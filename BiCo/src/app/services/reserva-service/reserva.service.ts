import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Reserva } from 'src/app/model/reserva.interface';
import { map, catchError } from 'rxjs/operators';
import { JWT_NAME } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  token: string = localStorage.getItem(JWT_NAME);
  constructor(private http: HttpClient) {}
  private url: string = 'http://localhost:8080';
  private headers = {
    headers: {
      Authorization: this.token,
    },
  };

  create(id: Number, reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(
      this.url + '/bookings/' + id,
      reserva,
      this.headers
    );
  }

  findOne(id: Number): Observable<Reserva> {
    return this.http
      .get<Reserva>(this.url + '/servises/' + id, this.headers)
      .pipe(catchError(this.errorHandler));
  }

  findBusinessByBooking() {
    return this.http.get<Negocio>(
      this.url + '/business/booking/',
      this.headers
    );
  }
  errorHandler(err: HttpErrorResponse) {
    return observableThrowError(err.message);
  }
}

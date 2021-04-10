import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Booking } from 'src/app/model/booking.interface';
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

  create(id: Number, reserva: Booking): Observable<Booking> {
    return this.http.post<Booking>(
      this.url + '/bookings/' + id,
      reserva,
      this.headers
    );
  }

  errorHandler(err: HttpErrorResponse) {
    return observableThrowError(err.message);
  }
}

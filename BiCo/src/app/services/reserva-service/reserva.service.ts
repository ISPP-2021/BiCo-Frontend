import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs'
import { Reserva } from 'src/app/model/reserva.interface'

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }


  create(reserva:Reserva): Observable<Reserva> {
    return this.http.post<Reserva>('https://stalion73.herokuapp.com/bookings/',reserva);
  }
}

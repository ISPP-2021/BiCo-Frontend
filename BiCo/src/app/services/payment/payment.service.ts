import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,  throwError as observableThrowError } from 'rxjs';
import { JWT_NAME } from '../authentication-service/authentication.service';
import { PaymentIntentDto } from 'src/app/model/payment-intent-dto';
import { catchError } from 'rxjs/operators';

const cabecera = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem(JWT_NAME),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  token: string = localStorage.getItem(JWT_NAME);
  constructor(private http: HttpClient) {}
  private url: string = 'https://bico-despliegue-4.herokuapp.com/stripe/';
  // private url: string = 'http://localhost:8080/stripe/';

  public pagar(paymentIntentDto: PaymentIntentDto): Observable<string> {
    return this.http.post<string>(
      this.url + 'paymentintent',
      paymentIntentDto,
      cabecera
    ).pipe(catchError(this.errorHandler));
  }

  public confirmar(id: string): Observable<string> {
    return this.http.post<string>(this.url + `confirm/${id}`, {}, cabecera)
      .pipe(catchError(this.errorHandler));
  }

  public cancelar(id: string): Observable<string> {
    return this.http.post<string>(this.url + `cancel/${id}`, {}, cabecera)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(err: HttpErrorResponse) {
    return observableThrowError(err.message);
  }
}

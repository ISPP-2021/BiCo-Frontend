import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT_NAME } from '../authentication-service/authentication.service';
import { PaymentIntentDto } from 'src/app/model/payment-intent-dto';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization':localStorage.getItem(JWT_NAME)})};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  token: string = localStorage.getItem(JWT_NAME);
	constructor(private http: HttpClient) { }
	private url: string = 'http://bico-despliegue2.herokuapp.com/stripe/';
	private url2: string = 'http://localhost:8080/stripe/';


  public pagar(paymentIntentDto: PaymentIntentDto): Observable<string> {
    return this.http.post<string>(this.url2 + 'paymentintent', paymentIntentDto, cabecera);
  }

  public confirmar(id: string): Observable<string> {
    return this.http.post<string>(this.url2 + `confirm/${id}`, {}, cabecera);
  }

  public cancelar(id: string): Observable<string> {
    return this.http.post<string>(this.url2 + `cancel/${id}`, {}, cabecera);
  }

}
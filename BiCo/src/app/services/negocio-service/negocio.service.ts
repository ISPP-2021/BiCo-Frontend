import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Negocio } from 'src/app/model/negocio.interface';
import { map, catchError } from 'rxjs/operators';
import { JWT_NAME } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class NegocioService {
  token: string = localStorage.getItem(JWT_NAME);
  constructor(private http: HttpClient) {}
  private url: string = 'https://bico-despliegue-4.herokuapp.com/';
  // private url: string = 'http://localhost:8080/';
  private headers = {
    headers: {
      Authorization: this.token,
    },
  };

  findAll(): Observable<Negocio[]> {
    return this.http
      .get<Negocio[]>(this.url + 'business', this.headers)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(err: HttpErrorResponse) {
    return observableThrowError(err.message);
  }

  findOneByBooking(id: Number): Observable<Negocio> {
    return this.http
      .get<Negocio>(this.url + 'business/booking/' + id, this.headers)
      .pipe(map((negocio: Negocio) => negocio));
  }

  findOne(id: Number): Observable<Negocio> {
    return this.http
      .get<Negocio>(this.url + 'business/' + id, this.headers)
      .pipe(map((negocio: Negocio) => negocio));
  }

  create(negocio: Negocio): Observable<Negocio> {
    return this.http.post<Negocio>(
      this.url + 'business',
      negocio,
      this.headers
    );
  }

  update(id: Number, negocio: Negocio): Observable<Negocio> {
    return this.http.put<Negocio>(
      this.url + 'business/' + id,
      negocio,
      this.headers
    );
  }

  delete(id: Number) {
    return this.http.delete(this.url + 'business/' + id, this.headers);
  }

  updateServices(id: Number, body) {
    return this.http.put(
      this.url + 'business/' + id + '/addition',
      body,
      this.headers
    );
  }

  deleteServices(id: Number) {
    return this.http.delete(this.url + 'servises/' + id, this.headers);
  }

  
  findService(id: Number) {
    return this.http
      .get(this.url + 'servises/' + id, this.headers);
  }
}

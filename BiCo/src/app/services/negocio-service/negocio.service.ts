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
  private url: string = 'http://bico-despliegue1.herokuapp.com/';
  private headers = {
    headers: {
      Authorization: this.token,
    },
  };

  findAll(): Observable<Negocio[]> {
    return this.http
      .get<Negocio[]>(this.url + 'business',this.headers)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(err: HttpErrorResponse) {
    return observableThrowError(err.message);
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

  findServices(id: Number) {
    return this.http.get<Negocio>(this.url + 'services' + id, this.headers);
  }
}

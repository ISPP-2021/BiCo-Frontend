import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs'
import { Negocio } from 'src/app/model/negocio.interface'
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { JWT_NAME } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FilterNegocioService {

  negocios = [];
  token: string = localStorage.getItem(JWT_NAME);
  constructor(private http: HttpClient) { }
  private url: string = 'http://bico-despliegue2.herokuapp.com/';
  private headers = {
    headers: {
      Authorization: this.token,
    },
  };

  findAll(): Observable<Negocio[]> {
    return this.http
      .get<Negocio[]>(this.url + 'business', this.headers)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(err: HttpErrorResponse) {
    return observableThrowError(err.message)
  }

  getNegociosFilter(filtro: string): Observable<Negocio[]> {
    const negociosFiltrados = []
    return this.http.get<Negocio[]>(this.url + 'business', this.headers)
      .pipe(map(spots => {
        return spots.filter(spot => {
          return spot.businessType == filtro;
        })
      }))

  }
}

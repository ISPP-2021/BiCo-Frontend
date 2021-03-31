import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs'
import { Negocio } from 'src/app/model/negocio.interface'
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FilterNegocioService {

  negocios = [];

  constructor(private http: HttpClient) { }

  findAll(): Observable<Negocio[]> {
		return this.http
			.get<Negocio[]>('https://stalion73.herokuapp.com/business/')
			.pipe(
				catchError(this.errorHandler)
			)
	}

	errorHandler(err: HttpErrorResponse) {
		return observableThrowError(err.message)
	}

  getNegociosFilter(filtro: string): Observable<Negocio[]> {
    const negociosFiltrados = []
    return this.http.get<Negocio[]>('https://stalion73.herokuapp.com/business/')
    .pipe(map(spots => {
      return spots.filter(spot => { 
          return  spot.businessType == filtro;
      })
  }))

  }
}

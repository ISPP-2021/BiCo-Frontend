import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs'
import { Negocio } from 'src/app/model/negocio.interface'
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class NegocioService {

	constructor(private http: HttpClient) { }

	findOne(id: Number): Observable<Negocio> {
		return this.http.get<Negocio>('https://stalion73.herokuapp.com/business/' + id).pipe(
			map((negocio: Negocio) => negocio)
		);
	}

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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/model/supplier.interface';
import { catchError, map } from 'rxjs/operators';
import { JWT_NAME } from '../authentication-service/authentication.service';

@Injectable({
	providedIn: 'root',
})
export class SupplierService {
	token: string = localStorage.getItem(JWT_NAME);
	constructor(private http: HttpClient) { }
	private url: string = 'http://bico-despliegue3.herokuapp.com/';
	private url2: string = 'http://localhost:8080/';
	private headers = {
		headers: {
			Authorization: this.token,
		},
	};

	findOne(id: Number): Observable<Supplier> {
		return this.http
			.get<Supplier>(this.url + 'users/profile', this.headers)
			.pipe(map((supplier: Supplier) => supplier));
		
	}
	
	change(priceId): Observable<String> {
		console.log("hasta luego")
		console.log(priceId)
		return this.http
		.post<String>(this.url + 'stripe/create-checkout-session', priceId, this.headers);
	}
}

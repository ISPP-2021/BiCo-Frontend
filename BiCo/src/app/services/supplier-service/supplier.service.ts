import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/model/supplier.interface';
import { catchError, map } from 'rxjs/operators';
import { JWT_NAME } from '../authentication-service/authentication.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class SupplierService {
	token: string = localStorage.getItem(JWT_NAME);
	constructor(private http: HttpClient, private router: Router) { }
	private url: string = 'https://bico-despliegue2.herokuapp.com/';
	private url2: string = 'http://localhost:8080/';
	private headers = {
		headers: {
			Authorization: this.token,
		},
	};

	findOne(): Observable<Supplier> {
		return this.http
			.get<Supplier>(this.url + 'users/profile', this.headers)
			.pipe(map((supplier: Supplier) => supplier));

	}

	change(priceId): Observable<String> {

		return this.http
		.post<String>(this.url + 'stripe/create-checkout-session', priceId, this.headers);
	}

  isOwnerBusiness(id: Number): Promise<boolean>{
    return this.findOne().pipe(
      map((user) => {
        if (user.business.find(x => x.id == id)) {
          return true;
        }else{
          this.router.navigate(['home'])
          return false;
        }
      })).toPromise()
  }
}

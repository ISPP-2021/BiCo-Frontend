import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/model/supplier.interface';
import { map } from 'rxjs/operators';
import { JWT_NAME } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  token: string = localStorage.getItem(JWT_NAME);
  constructor(private http: HttpClient) { }
  private url: string = 'https://stalion73.herokuapp.com/';
  private headers = {
    headers: {
      Authorization: this.token,
    },
  };

  findOne(id: Number): Observable<Supplier> {
    return this.http
      .get<Supplier>(this.url + 'suppliers/' + id)
      .pipe(map((supplier: Supplier) => supplier));
  }
}

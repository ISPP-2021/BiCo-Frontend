import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/model/supplier.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  findOne(id: Number): Observable<Supplier> {
    return this.http
      .get<Supplier>('https://stalion73.herokuapp.com/suppliers/' + id)
      .pipe(map((supplier: Supplier) => supplier));
  }
}

import { HttpClient } from '@angular/common/http'
import { ImplicitReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Negocio } from 'src/app/model/negocio.interface'
import { map } from 'rxjs/operators';

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
}

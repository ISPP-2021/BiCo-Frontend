import { HttpClient } from '@angular/common/http'
import { ImplicitReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Negocio } from 'src/app/model/negocio.interface'

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  constructor(private http: HttpClient) { }

  findOne(id: Number): Observable<Negocio> {
    return this.http.get<Negocio>('/negocio/' + id);
  }
}

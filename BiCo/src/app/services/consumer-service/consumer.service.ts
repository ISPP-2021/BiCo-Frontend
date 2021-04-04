import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from 'src/app/model/consumer.interface';
import { map } from 'rxjs/operators';
import { JWT_NAME } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  token: string = localStorage.getItem(JWT_NAME);
  constructor(private http: HttpClient) { }
  private url: string = 'http://bico-despliegue1.herokuapp.com/';
  private headers = {
    headers: {
      Authorization: this.token,
    },
  };

  findOne(id: Number): Observable<Consumer> {
    return this.http
      .get<Consumer>(this.url + 'consumers/' + id, this.headers)
      .pipe(map((consumer: Consumer) => consumer));
  }
}

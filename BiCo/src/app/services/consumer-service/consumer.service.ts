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
  constructor(private http: HttpClient) {}
  private url: string = 'https://backend-bico.herokuapp.com/';
  private url2: string = 'http://localhost:8080/';
  private headers = {
    headers: {
      Authorization: this.token,
    },
  };

  findOne(): Observable<Consumer> {
    return this.http
      .get<Consumer>(this.url + 'users/profile', this.headers)
      .pipe(map((consumer: Consumer) => consumer));
  }

  all(): Observable<Consumer[]>{
    return this.http.get<Consumer[]>(this.url + 'consumers', this.headers)
  }

  update(id: Number, consumer: Consumer): Observable<Consumer>{
    return this.http.put<Consumer>(this.url + "consumers/" + id, consumer, this.headers)
  }
}

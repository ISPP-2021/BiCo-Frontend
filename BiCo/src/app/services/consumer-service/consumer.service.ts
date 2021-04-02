import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from 'src/app/model/consumer.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  constructor(private http: HttpClient) {}

  findOne(id: Number): Observable<Consumer> {
    return this.http
      .get<Consumer>('https://stalion73.herokuapp.com/consumers/' + id)
      .pipe(map((consumer: Consumer) => consumer));
  }
}

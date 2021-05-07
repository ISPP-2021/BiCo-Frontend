import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  token: string = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

   private headers = {
    headers: {
      Authorization: this.token,
    },
  };

  private url: string = 'https://bico-despliegue3.herokuapp.com/';
  private url2: string = 'http://localhost:8080/';

  upload(formData) {
     return this.http.post(this.url2 + 'images/profile/upload', formData, this.headers)
  }

}

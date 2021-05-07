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

  // private url: string = 'https://bico-despliegue3.herokuapp.com/';
  private url: string = 'http://localhost:8080/';

  upload(formData:FormData) {
     return this.http.post(this.url + 'images/upload', formData, this.headers)
  }

  getProfilePic(username:string){
    return this.http.get(this.url + 'images/profile/'+username, this.headers)
  }

}

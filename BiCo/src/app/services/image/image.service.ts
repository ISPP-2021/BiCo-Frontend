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
     return this.http.post(this.url + 'images/profile/upload', formData, this.headers)
  }

  getProfilePic(){
    let username = localStorage.getItem('username');
    let image = this.http.get(this.url + 'images/profile/'+ username, {responseType:'text', headers:{
      Authorization:this.token
    }});
    // console.log(image.subscribe())
    return image;
  }

}

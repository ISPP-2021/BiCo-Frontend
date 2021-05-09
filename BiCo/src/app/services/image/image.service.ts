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
    private option = {
      responseType: 'blob' as const,
      headers: {
        Authorization: this.token,
      },
    };
    private options = {
      responseType: 'blob' as const,
      headers: {
        Authorization: this.token,
      },
    };

  // private url: string = 'https://bico-despliegue3.herokuapp.com/';
  private url: string = 'http://localhost:8080/';

  upload(formData:FormData) {
     return this.http.post(this.url + 'images/profile/upload', formData, this.headers)
  }

  uploadBusiness(formData:FormData, id) {
     return this.http.post(this.url + 'images/upload/batch/'+id, formData, this.option)
  }

  getProfilePic():any{
    let username = localStorage.getItem('username');
    return this.http.get(this.url + 'images/profile/'+ username,this.option)
  }

  getBusinessPic(id):any{
    return this.http.get(this.url + 'images/business/'+ id,this.headers)
  }

  deleteBusinessPic(id):any{
    return this.http.delete(this.url + 'images/business/'+ id,this.headers)
  }

  getImage(name):any{
    return this.http.get(this.url + 'images/'+ name,this.option)
  }

}

import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private jwtHelper: JwtHelperService) { }

  getUserRole(){
    return this.jwtHelper.decodeToken(localStorage.getItem(JWT_NAME)).authorities[0];
}

  getUser(){
    return this.jwtHelper.decodeToken(localStorage.getItem(JWT_NAME));
}

}




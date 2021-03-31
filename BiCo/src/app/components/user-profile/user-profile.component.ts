import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(  ) { }

  usuario = [
    {
        "id" : "1",
        "username" : "JohnDoe",
        "password" : "JohnDoe123",
        "name" : "John",
        "lastname" : "Doe",
        "email" : "johndoe@doefamily.org",
        "dni" : "78945612T",
    }
  ]

  ngOnInit(): void {  }

}

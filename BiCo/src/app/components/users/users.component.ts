import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['username', 'password', 'name', 'lastname', 'email', 'dni'];
  constructor() { }

  usuarios = [
    {
        "username" : "JohnDoe",
        "password" : "JohnDoe123",
        "name" : "John",
        "lastname" : "Doe",
        "email" : "johndoe@doefamily.org",
        "dni" : "78945612T",
        "autority" : "Supplier"
    },
    {
      "username" : "JaneDoe",
      "password" : "JaneDoe123",
      "name" : "Jane",
      "lastname" : "Doe",
      "email" : "janedoe@doefamily.org",
      "dni" : "47895621W",
      "autority" : "Consumer"
    }
  ]

  ngOnInit(): void {
  }

}

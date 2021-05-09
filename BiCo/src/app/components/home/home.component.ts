import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
	title = 'Home';
	rol = localStorage.getItem("rol");

  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    if(this.authService.isTokenExpired()){
      localStorage.clear()
    }
  }
}

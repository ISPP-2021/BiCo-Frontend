import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    if(this.authService.isTokenExpired()){
      localStorage.clear()
    }
  }

  rol = localStorage.getItem('rol');
  user_id = localStorage.getItem('user_id');

  navigateTo(value) {
    this.router.navigate(['../', value]);
  }

  logout() {
    this.authService.logout();
    window.location.replace('/home');
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
constructor(private authService: AuthenticationService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isTokenExpired()){
      localStorage.clear();
      window.location.replace('/login');
    }
    const rol = localStorage.getItem('rol')
    if(rol != 'owner'){
      this.router.navigate(['home'])
    }
    return true;
  }

}

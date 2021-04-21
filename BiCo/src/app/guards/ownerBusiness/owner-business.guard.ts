import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupplierService } from 'src/app/services/supplier-service/supplier.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerBusinessGuard implements CanActivate {
  constructor(private rout: ActivatedRoute, private router: Router, private supplierService: SupplierService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id =  route.url[1].path
    return  this.check(id)
  }

  async check(id){
    const isOwner = await this.supplierService.isOwnerBusiness(parseInt(id))
    return isOwner;
  }

}

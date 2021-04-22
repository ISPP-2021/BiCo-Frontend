import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Supplier } from 'src/app/model/supplier.interface';
import { SupplierService } from 'src/app/services/supplier-service/supplier.service';
import { StripeService} from 'ngx-stripe';
import {loadStripe} from '@stripe/stripe-js';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.css'],
})
export class SupplierProfileComponent implements OnInit {

  priceIdFree = "price_1IgusMA32JKQZm0zXIdyzCOy";
  priceIdPremium = "price_1IgurxA32JKQZm0zDkVqgm5q";
  stripe = loadStripe('pk_test_51IeGm1A32JKQZm0zQ9rDl6vL1KuiQYaGHiszd0nJ4dUDy5AW3K9tmHjJLdbdxbsPivHTtQ5JR7uvNlo1tAP1Of6v00oarGizZJ');


  supplier$: Observable<Supplier> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const supplierId: number = parseInt(params['id']);

      return this.supplierService
        .findOne()
        .pipe(map((supplier: Supplier) => supplier));

    })
  );


  constructor(
    private activatedRoute: ActivatedRoute,
    private supplierService: SupplierService,
    private stripeService: StripeService
  ) {}

   checkout = async(sessionId) => {
    (await this.stripe).redirectToCheckout({

      sessionId: sessionId

    })
    .then(handleResult => {
      console.log("dani tonto")
    });
  };


  changeSubscription(subscription){
    let res = window.confirm("¿Esta seguro de que desea cambiar su tipo de suscripción?")
    if(res){
      if(subscription==='FREE'){
        var sessionId;
        this.supplierService.change(this.priceIdPremium).subscribe(r =>{
          sessionId = r['sessionId']
          this.checkout(sessionId)

         // stripe.redirectToCheckout
        });
      }else{
        var sessionId;
        this.supplierService.change(this.priceIdFree).subscribe(r =>{
          sessionId = r['sessionId']
          this.checkout(sessionId)
        });
      }
  }

  }
  ngOnInit(): void {

  }
}

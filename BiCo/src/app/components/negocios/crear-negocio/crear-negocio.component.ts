import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { JWT_NAME } from 'src/app/services/authentication-service/authentication.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Supplier } from 'src/app/model/supplier.interface';
import { SupplierService } from 'src/app/services/supplier-service/supplier.service';
import { loadStripe } from '@stripe/stripe-js';


@Component({
	selector: 'app-crear-negocio',
	templateUrl: './crear-negocio.component.html',
	styleUrls: ['./crear-negocio.component.css']
})
export class CrearNegocioComponent implements OnInit {

	priceIdFree = "price_1IgusMA32JKQZm0zXIdyzCOy";
  	priceIdPremium = "price_1IgurxA32JKQZm0zDkVqgm5q";
  	stripe = loadStripe('pk_test_51IeGm1A32JKQZm0zQ9rDl6vL1KuiQYaGHiszd0nJ4dUDy5AW3K9tmHjJLdbdxbsPivHTtQ5JR7uvNlo1tAP1Of6v00oarGizZJ');


	//llamar a nameService name e inicializar las bookings a vacio
  	rol = localStorage.getItem('rol')
	token: string = localStorage.getItem(JWT_NAME);
	form: FormGroup;

	supplier$: Observable<Supplier> = this.activatedRoute.params.pipe(
		switchMap((params: Params) => {
		  const supplierId: number = parseInt(params['id']);

		  return this.supplierService
			.findOne()
			.pipe(map((supplier: Supplier) => supplier));

		})
	  );

	constructor(
		private formBuilder: FormBuilder,
		private negocioService: NegocioService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private supplierService: SupplierService
		) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			name: ['', [Validators.required]],
			address: ['', Validators.required],
			businessType: ['', [Validators.required]],
			option: this.formBuilder.group({
				automatedAccept: [false, [Validators.required]],
				limitAutomated: [{ value: '', disabled: true }, [Validators.required,, Validators.min(1)]],
				defaultDeposit: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
				depositTimeLimit: ['', [Validators.required, Validators.min(1)]]
			}),
			services: this.formBuilder.array([])
		});
	}

	get serviceArray() {
		return <FormArray>this.form.get('services');
	}

	addServiceGroup() {
		return this.formBuilder.group({
			name: ['', [Validators.required]],
			description: ['', [Validators.required]],
			price: ['', [Validators.required, Validators.min(0.01)]],
			duration: ['', [Validators.required, Validators.min(0)]],
			capacity: ['', [Validators.required, Validators.min(0)]],
			deposit: ['', [Validators.required, Validators.min(0)]],
			tax: ['',[Validators.required, Validators.min(0), Validators.max(1)]],
			bookings: this.formBuilder.array([])
			});
	}

	addService() {
		this.serviceArray.push(this.addServiceGroup());
	}

	removeService(index) {
		let res = window.confirm("¿Esta seguro de que desea borrar el servicio?")
		if(res){
			this.serviceArray.removeAt(index);
		}
	}

	save() {
		if (this.form.valid) {
			if(this.serviceArray.length===0){
			this.serviceArray.push(this.defaultService())
			}

			this.negocioService.create(this.form.value).subscribe( res=>{
        	this.router.navigate(['mis-negocios'])})

		}
	}

	defaultService(){
		return this.formBuilder.group({
				name: ['Solo Reserva', [Validators.required]],
				description: ['Reservar en el negocio', [Validators.required]],
				price: [0.01, [Validators.required, Validators.min(0.01)]],
				duration: [0, [Validators.required, Validators.min(0)]],
				capacity: [0, [Validators.required, Validators.min(0)]],
				deposit: [0, [Validators.required, Validators.min(0)]],
				tax: [0,[Validators.required, Validators.min(0), Validators.max(1)]],
				bookings: this.formBuilder.array([])
			});
  }

	disable() {
		if (this.form.get('option.automatedAccept').value == true) {
			this.form.get('option.limitAutomated').enable()
		} else {
			this.form.get('option.limitAutomated').disable()
		}

	}

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
}

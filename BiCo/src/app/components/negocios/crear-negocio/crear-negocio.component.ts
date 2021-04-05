import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import {  Router } from '@angular/router';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { JWT_NAME } from 'src/app/services/authentication-service/authentication.service';

@Component({
	selector: 'app-crear-negocio',
	templateUrl: './crear-negocio.component.html',
	styleUrls: ['./crear-negocio.component.css']
})
export class CrearNegocioComponent implements OnInit {

	//llamar a nameService name e inicializar las bookings a vacio
  rol = localStorage.getItem('rol')
	token: string = localStorage.getItem(JWT_NAME);
	form: FormGroup;
	constructor(private formBuilder: FormBuilder, private negocioService: NegocioService, private router: Router) { }

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
			services: this.formBuilder.array([this.addServiceGroup()])
		});
	}

	get serviceArray() {
		return <FormArray>this.form.get('services');
	}

	addServiceGroup() {
		return this.formBuilder.group({
			name: ['', [Validators.required]],
			description: ['', [Validators.required]],
			price: ['', [Validators.required, Validators.min(0)]],
			duration: ['', [Validators.required, Validators.min(0)]]
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
			this.negocioService.create(this.form.value).subscribe(res=>{
        this.router.navigate(['home'])
      })

		}

	}

	disable() {
		if (this.form.get('option.automatedAccept').value == true) {
			this.form.get('option.limitAutomated').enable()
		} else {
			this.form.get('option.limitAutomated').disable()
		}

	}
}

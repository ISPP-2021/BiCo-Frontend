import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { JWT_NAME } from 'src/app/services/authentication-service/authentication.service';

@Component({
	selector: 'app-crear-negocio',
	templateUrl: './crear-negocio.component.html',
	styleUrls: ['./crear-negocio.component.css']
})
export class CrearNegocioComponent implements OnInit {

	//llamar a nameService name e inicializar las bookings a vacio
	token: string = localStorage.getItem(JWT_NAME);
	form: FormGroup;
	constructor(private formBuilder: FormBuilder, private negocioService: NegocioService) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			name: ['', [Validators.required]],
			address: ['', Validators.required],
			businessType: ['', [Validators.required]],
			option: this.formBuilder.group({
				automatedAccept: ['', [Validators.required]],
				limitAutomated: [{ value: '', disabled: true }, [Validators.required]],
				defaultDeposit: ['', [Validators.required]],
				depositTimeLimit: ['', [Validators.required]]
			}),
			services: this.formBuilder.array([this.addServiceGroup()])
		});
	}

	get serviceArray() {
		return <FormArray>this.form.get('services');
	}

	addServiceGroup() {
		return this.formBuilder.group({
			nameService: ['', [Validators.required]],
			description: ['', [Validators.required]],
			price: ['', [Validators.required]],
			duration: ['', [Validators.required]]
		});
	}

	addService() {
		this.serviceArray.push(this.addServiceGroup());
	}

	removeService(index) {
		this.serviceArray.removeAt(index);
	}

	save() {
		if (this.form.valid) {
			this.negocioService.create(this.form.value).subscribe()
			console.log(this.form.value)
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

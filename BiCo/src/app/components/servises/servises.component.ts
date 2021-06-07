import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { HttpClient } from '@angular/common/http';
import { Negocio } from 'src/app/model/negocio.interface';
import { servicesVersion } from 'typescript';

@Component({
  selector: 'app-servises',
  templateUrl: './servises.component.html',
  styleUrls: ['./servises.component.css'],
})
export class ServisesComponent implements OnInit {
  //url: /servises/idBusiness
  //llamar a nameService name e inicializar las bookings a vacio

  rol = localStorage.getItem('rol');
  form: FormGroup;
  negocioId = parseInt(this.route.snapshot.paramMap.get('id'));
  negocio;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private negocioService: NegocioService
  ) {}

  ngOnInit(): void {
    this.negocioService.findOne(this.negocioId).subscribe((negocio) => {
      this.negocio = negocio;
      this.form = this.formBuilder.group({
        servises: this.formBuilder.array([]),
      });
      this.initService(negocio.services);
    });
  }

  initService(services) {
    services.forEach((x) => {
      this.serviceArray.push(this.formBuilder.group(x));
    });
  }

  get serviceArray() {
    return <FormArray>this.form.get('servises');
  }

  addBlankServiceGroup() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      duration: ['', [Validators.required, Validators.min(0)]],
      capacity: ['', [Validators.required, Validators.min(0)]],
     // deposit: ['', [Validators.required, Validators.min(0)]],
      tax: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
    });
  }

  addService() {
    this.serviceArray.push(this.addBlankServiceGroup());
  }

  removeService(index) {
    let res = window.confirm('¿Esta seguro de que desea borrar el servicio?');
    if (res) {
      let servises = this.serviceArray.value;
      let serviceId = servises[index].index;
      this.negocioService.deleteServices(serviceId).subscribe();
      this.serviceArray.removeAt(index);
    }
  }
  defaultService() {
    return this.formBuilder.group({
      name: ['Solo Reserva', [Validators.required]],
      description: ['Reservar en el negocio', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      capacity: [0, [Validators.required, Validators.min(0)]],
    //  deposit: [0, [Validators.required, Validators.min(0)]],
      tax: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      bookings: this.formBuilder.array([]),
    });
  }

  save() {
    if (this.form.valid) {
      if (this.serviceArray.length === 0) {
        this.serviceArray.push(this.defaultService());
        let serviceDefault = this.serviceArray.value[0];
        this.negocioService
          .updateServices(this.negocioId, serviceDefault)
          .subscribe(() => {
            window.location.replace('/mis-negocios');
          });
      } else {
        let servises = this.serviceArray.value;
        for (let index = 0; index < servises.length; index++) {
          const service = servises[index];
          service.bookings = [];
          service.business = null;
          this.negocioService
            .updateServices(this.negocioId, service)
            .subscribe(() => {
              window.location.replace('/mis-negocios');
            });
        }
      }
    }
  }
}

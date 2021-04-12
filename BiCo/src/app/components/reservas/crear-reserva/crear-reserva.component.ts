import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { Negocio } from 'src/app/model/negocio.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Reserva } from 'src/app/model/reserva.interface';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css'],
})
export class CrearReservaComponent implements OnInit {
  form: FormGroup;
  serviciosReservados: any;
  errorMessage = '';
  negocio = {};
  pago: number;
  nombre: string;
  reserva: Reserva;
  servicioId: number;
  bookDate: Date;
  emisionDate: String;
  status: string;
  description: String;

  rol: string = localStorage.getItem('rol');
  negocioId = parseInt(this.route.snapshot.paramMap.get('id'));

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private negocioService: NegocioService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.negocioService
      .findOne(this.negocioId)
      .subscribe((data) => (this.negocio = data));
    this.form = this.formBuilder.group({
      bookDate: ['', [Validators.required]],
      emisionDate: [''],
      status: ['IN_PROGRESS'],
      services: this.formBuilder.array([this.addServiceGroup()]),
    });
  }

  get serviceArray() {
    return <FormArray>this.form.get('services');
  }

  addServiceGroup() {
    return this.formBuilder.group({
      id: ['', [Validators.required]],
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
      let reserva: Reserva;
      let servicios = this.form.value.services;
      for (let servicio of servicios) {
        reserva = {
          bookDate: this.form.value.bookDate,
          emisionDate: this.form.value.emisionDate,
          status: this.form.value.status,
        };
        this.reservaService.create(servicio.id, reserva).subscribe();
        this.router.navigate(['reservas']);
      }
    }
  }

  pagoTotal(event) {
    for (let servicio of this.negocio['services']) {
      if (servicio.id == event) {
        this.pago = servicio.price * (servicio.deposit / 100);
        this.pago = Math.round(this.pago * 100) / 100;
        this.nombre = servicio.name;
        this.servicioId = servicio.id;
        this.description = servicio.description;
        (this.bookDate = this.form.value.bookDate),
          (this.emisionDate = new Date().toISOString().substr(0, 16)),
          (this.status = this.form.value.status);
      }
    }
    if (this.pago == 0) {
      document.getElementById('boton-reservar').style.display = 'inline';
      document.getElementById('formulario-pago').style.display = 'none';
    } else {
      document.getElementById('boton-reservar').style.display = 'none';
      document.getElementById('formulario-pago').style.display = 'inline';
    }
  }

  fechaActual(formulario: FormGroup) {
    let date: Date = new Date();
    this.form.patchValue({
      emisionDate: date,
    });
  }
}

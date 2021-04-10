import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { Negocio } from 'src/app/model/negocio.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Booking } from 'src/app/model/booking.interface';

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
      let reserva: Booking;
      let servicios = this.form.value.services;
      for (let servicio of servicios) {
        reserva = {
          bookDate: this.form.value.bookDate,
          emisionDate: this.form.value.emisionDate,
          status: this.form.value.status,
        };
        console.log(reserva);
        this.reservaService.create(servicio.id, reserva).subscribe();
        this.router.navigate(['reservas']);
        window.location.reload();
      }
    }
  }

  fechaActual(formulario: FormGroup) {
    let date: Date = new Date();
    this.form.patchValue({
      emisionDate: date,
    });
  }
}

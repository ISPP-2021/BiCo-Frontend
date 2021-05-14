import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Reserva } from 'src/app/model/reserva.interface';
import { Observable } from 'rxjs';
import { Negocio } from 'src/app/model/negocio.interface';
import { map, switchMap } from 'rxjs/operators';

class CustomValidators {

  static validBookDate (control: AbstractControl): ValidationErrors{
    const bookDate = new Date(control.get('bookDate').value)
    let hours = bookDate.getHours();
    if(hours === 0){
      hours = 24
    }
    const minutes = bookDate.getMinutes();
    const openTime = control.get('openTime').value.split(":")
    const openTimeHours = Number(openTime[0])
    const openTimeMinutes = Number(openTime[1])
    const closeTime = control.get('closeTime').value.split(":")
    let closeTimeHours = Number(closeTime[0])
    if(closeTimeHours === 0){
      closeTimeHours = 24
    }
    const closeTimeMinutes = Number(closeTime[1])

    if(hours < openTimeHours || hours>closeTimeHours){
      return {invalidBookDate: true};
    }else if((hours === openTimeHours && minutes < openTimeMinutes) || (hours === closeTimeHours && minutes > closeTimeMinutes)){
      return {invalidBookDate: true};
    }else{
      return null;
    }

  }

}


@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css'],
})
export class CrearReservaComponent implements OnInit {
  public value: Date = new Date();
  public format = 'dd/MM/yyyy HH:mm';
  public minDate: Date = new Date()
  form: FormGroup;
  serviciosReservados: any;
  errorMessage = '';
  negocio = {};
  pago: number = 0;
  nombre: string;
  reserva: Reserva;
  servicioId: number;
  bookDate: Date;
  emisionDate: Date;
  status: string;
  description: String;
  public servicios;

  rol: string = localStorage.getItem('rol');
  negocioId = parseInt(this.route.snapshot.paramMap.get('id'));
  negocio$: Observable<Negocio> = this.route.params.pipe(
    switchMap((params: Params) => {
      const negocioId: number = parseInt(params['id']);

      return this.negocioService.findOne(negocioId).pipe(
        map((negocio: Negocio) => negocio)
  )
})
  )
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private negocioService: NegocioService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.minDate.setMinutes(this.value.getMinutes() + 30)
    this.negocioService.findOne(this.negocioId).subscribe(negocio => {
        this.form = this.formBuilder.group({
          openTime: [negocio.openTime],
          closeTime: [negocio.closeTime],
          bookDate: [null, [Validators.required]],
          emisionDate: [new Date],
          status: ['IN_PROGRESS'],
          services: this.formBuilder.array([this.addServiceGroup()]),
        },{
          validators: CustomValidators.validBookDate
        });
        this.negocio = negocio
        this.servicios = negocio.services
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
    //  if(this.form.value.bookDate.getHours())
      let reserva: Reserva;
      let servicios = this.form.value.services;
      for (let servicio of servicios) {
        reserva = {
          bookDate: this.form.value.bookDate,
          emisionDate: this.form.value.emisionDate.setHours(this.form.value.emisionDate.getHours() + 2),
          status: this.form.value.status,
        };
        this.reservaService.create(servicio.id, reserva).subscribe(()=>{
          this.router.navigate(['reservas']);
        });

        //
      }
      //window.location.replace('reservas')
    }
  }

  pagoTotal(event) {
    for (let servicio of this.negocio['services']) {
      if (servicio.id == event) {
        this.pago = servicio.price * servicio.tax;
        this.pago = Math.round(this.pago * 100) / 100;
        this.nombre = servicio.name;
        this.servicioId = servicio.id;
        this.description = servicio.description;
        (this.bookDate = this.form.value.bookDate.setHours(this.form.value.bookDate.getHours() + 2)),
        (this.bookDate = this.form.value.bookDate.toISOString().substr(0, 16)),
        (this.emisionDate = new Date()),
        (this.emisionDate = this.form.value.emisionDate.setHours(this.form.value.emisionDate.getHours() + 2)),
          (this.emisionDate = this.form.value.emisionDate.toISOString().substr(0, 16)),
          (this.status = this.form.value.status);
      }
    }
    if (this.pago == 0 && !this.form.hasError('invalidBookDate')) {
      document.getElementById('boton-reservar').style.display = 'inline';
      document.getElementById('formulario-pago').style.display = 'none';
    } else if (this.pago != 0 && !this.form.hasError('invalidBookDate')){
      document.getElementById('boton-reservar').style.display = 'none';
      document.getElementById('formulario-pago').style.display = 'inline';
    }
  }

  hideOrShowPaymentForm(): void{
      if(document.getElementById('formulario-pago').style.display == 'inline' &&
        this.form.hasError('invalidBookDate')){
        document.getElementById('formulario-pago').style.display = 'none';
      }else if(document.getElementById('formulario-pago').style.display == 'none' &&
        !this.form.hasError('invalidBookDate') && this.pago != 0){
        document.getElementById('formulario-pago').style.display = 'inline';
      }else if(document.getElementById('formulario-pago').style.display == 'none' &&
        !this.form.hasError('invalidBookDate') && this.pago == 0){
        document.getElementById('boton-reservar').style.display = 'inline';
      }
  }

  fechaActual(formulario: FormGroup) {
    let date: Date = new Date();
    this.form.patchValue({
      emisionDate: date,
    });
  }


}

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
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

class CustomValidators {

  static validBookDate (control: AbstractControl): ValidationErrors{
    let hours = new Date(control.get('hour').value).getHours();
    if(hours === 0){
      hours = 24
    }
    const minutes =  new Date(control.get('hour').value).getMinutes();
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
    }else if((hours === openTimeHours && minutes === openTimeMinutes) || (hours === closeTimeHours && minutes === closeTimeMinutes)){
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
  public formatHour = 'HH:mm';
  public minDate: Date = new Date()
  public steps: any = {minute: 15};
  minHour:Date = new Date()
  maxHour:Date = new Date()
  showHour:boolean = false
  form: FormGroup;
  serviciosReservados: any;
  errorMessage = '';
  negocio = {};
  pago: number = 0;
  nombre: string;
  reserva: Reserva;
  servicioId: number;
  bookDate: any;
  emisionDate: Date;
  status: string;
  description: String;
  public servicios;
  err: String;
  showPago:boolean;
  showErrorHour: boolean = false;

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
  showFree: boolean;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private negocioService: NegocioService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.showPago=false;
    this.showErrorHour=false;
    this.minDate.setDate(this.value.getDate())
    this.negocioService.findOne(this.negocioId).subscribe(negocio => {
        this.minDate.setHours(this.value.getHours())
        let openHour = negocio.openTime.split(":")[0]
        let openMinutes = negocio.openTime.split(":")[1]
        this.minHour.setHours(Number(openHour))
        this.minHour.setMinutes(Number(openMinutes)+15)
        let closeHour = negocio.closeTime.split(":")[0]
        let closeMinutes = negocio.closeTime.split(":")[1]
        this.maxHour.setHours(Number(closeHour))
        this.maxHour.setMinutes(Number(closeMinutes)-15)
        this.showHour = true
        this.form = this.formBuilder.group({
          openTime: [negocio.openTime],
          closeTime: [negocio.closeTime],
          bookDate: [new Date(), [Validators.required]],
          hour:[this.minHour, [Validators.required]],
          status: ['IN_PROGRESS'],
          services: this.formBuilder.array([this.addServiceGroup()]),
        },{
          validators: CustomValidators.validBookDate
        });
        this.negocio = negocio
        this.servicios = negocio.services
      }, error =>{
        this.showHour = true
        this.err= error.error.detail
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
      let reserva: any;
      let servicios = this.form.value.services;
      let hour = new Date().getHours()
      let emision = new Date().setHours(hour + 2)
      let book = new Date(this.form.value.bookDate)
      let hourBook = this.form.value.hour.getHours()
      let minuteBook = this.form.value.hour.getMinutes()
      book.setHours(hourBook+2)
      book.setMinutes(minuteBook)
      for (let servicio of servicios) {
        reserva = {
          bookDate: new Date(book).toISOString(),
          status: this.form.value.status,
        };
        this.reservaService.create(servicio.id, reserva).subscribe(res=>{
          this.router.navigate(['reservas']);
        }, error => {
          this.err= error.error.detail
        });

        //
      }
      //window.location.replace('reservas')
    }
  }

  pagoTotal(type,event) {
    for (let servicio of this.negocio['services']) {
      if (servicio.index == event) {
        this.pago = servicio.price * servicio.tax;
        this.pago = Math.round(this.pago * 100) / 100;
        this.nombre = servicio.name;
        this.servicioId = servicio.index;
        this.description = servicio.description;
        (this.bookDate = new Date(this.form.value.bookDate)),
        (this.bookDate.setHours(this.form.value.hour.getHours()+2)),
        (this.bookDate.setMinutes(this.form.value.hour.getMinutes())),
        (this.bookDate = this.bookDate.toISOString()),
        (this.status = this.form.value.status);
      }
    }
    if(type === "time" ||type === "date"){
      let formHour = new Date(this.form.value.hour)
      this.bookDate = new Date(this.form.value.bookDate)
      this.bookDate.setHours(formHour.getHours()+2)
      this.bookDate.setMinutes(formHour.getMinutes())
      this.bookDate = this.bookDate.toISOString()
    }
    if (this.pago == 0 && !this.form.hasError('invalidBookDate')) {
      this.showPago = false
      let book = new Date(this.form.value.bookDate)
      book.setHours(this.form.value.hour.getHours())
      book.setMinutes(this.form.value.hour.getMinutes())
      let now = new Date()
      if(book<now){
       this.showFree = false
       this.showErrorHour = true
      }else{
        this.showFree = true
        this.showErrorHour = false
      }
      //document.getElementById('boton-reservar').style.display = 'inline';
      //document.getElementById('formulario-pago').style.display = 'none';
    }else if (this.pago != 0 && !this.form.hasError('invalidBookDate')){
      let book = new Date(this.form.value.bookDate)
      book.setHours(this.form.value.hour.getHours())
      book.setMinutes(this.form.value.hour.getMinutes())
      let now = new Date()
      if(book<now){
       this.showPago = false
       this.showErrorHour = true
      }else{
        this.showPago = true
        this.showErrorHour = false
      }
    }
  }
}

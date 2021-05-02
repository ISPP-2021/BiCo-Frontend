import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Reserva } from 'src/app/model/reserva.interface';
import { Observable, Subscription } from 'rxjs';
import { Negocio } from 'src/app/model/negocio.interface';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { ConsumerService } from 'src/app/services/consumer-service/consumer.service';
import { Consumer } from 'src/app/model/consumer.interface';

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
  selector: 'app-crear-reserva-propietario',
  templateUrl: './crear-reserva-propietario.component.html',
  styleUrls: ['./crear-reserva-propietario.component.css']
})
export class CrearReservaPropietarioComponent implements OnInit {
  public value: Date = new Date();
  public format = 'dd/MM/yyyy HH:mm';
  public minDate: Date = new Date()
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
  public servicios;

  rol: string = localStorage.getItem('rol');
  negocioId = parseInt(this.route.snapshot.paramMap.get('id'));
  negocio$: Observable<Negocio> = this.route.params.pipe(
    switchMap((params: Params) => {
      const negocioId: number = parseInt(params['id']);

      return this.negocioService.findOne(negocioId).pipe(
        map((negocio: Negocio) => negocio))
    })
  )

  public keyword = 'name';

  public consumers$: Observable<Consumer[]>;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private negocioService: NegocioService,
    private reservaService: ReservaService,
    private consumerService: ConsumerService
  ) { }

  ngOnInit() {
    this.minDate.setMinutes(this.value.getMinutes() + 30)
    this.negocioService.findOne(this.negocioId).subscribe(negocio => {
        this.form = this.formBuilder.group({
          openTime: [negocio.openTime],
          closeTime: [negocio.closeTime],
          bookDate: [null, [Validators.required]],
          emisionDate: [''],
          status: ['COMPLETED'],
          consumer: ['', Validators.required],
          services: this.formBuilder.array([this.addServiceGroup()]),
        },{
          validators: CustomValidators.validBookDate
        });
        this.negocio = negocio
        this.servicios = negocio.services
        this.getConsumers()
      });
  }

  getConsumers():void{
    this.consumers$ = this.consumerService.all()
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
      // console.log(this.form.value.bookDate)
      for (let servicio of servicios) {
        reserva = {
          bookDate: this.form.value.bookDate.toISOString().substr(0, 16),
          emisionDate: this.form.value.emisionDate,
          status: this.form.value.status,
        };
        this.reservaService.createFor(servicio.id, this.form.value.consumer.id, reserva).subscribe(()=>{
          this.router.navigate(['mis-negocios']);
        });

      }
      //window.location.replace('reservas')
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
        (this.bookDate = this.form.value.bookDate.toISOString().substr(0, 16)),
          (this.emisionDate = new Date().toISOString().substr(0, 16)),
          (this.status = this.form.value.status);
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

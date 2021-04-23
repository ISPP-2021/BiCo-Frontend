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

  // negocio2$: Observable<Negocio> = this.route.params.pipe(
  //   switchMap((params: Params) => {
  //     const negocioId: number = parseInt(params['id']);

  //     return this.negocioService
  //       .findOne(negocioId)
  //       .pipe(map((negocio2: Negocio) => negocio2));
  //   })
  // );

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
    this.negocioService
      .findOne(this.negocioId)
      .subscribe((data) => (this.negocio = data));
    this.form = this.formBuilder.group({
      businessOpenTime: [''],
      businessCloseTime: [''],
      bookDate: [null, [Validators.required]],
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
    //  if(this.form.value.bookDate.getHours())
    console.log(this.form.value.bookDate.getHours())
      let reserva: Reserva;
      let servicios = this.form.value.services;
      for (let servicio of servicios) {
        reserva = {
          bookDate: this.form.value.bookDate,//.toISOString().substr(0, 16),
          emisionDate: this.form.value.emisionDate,
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
    console.log(this.form.value.bookDate.getHours())
    console.log(this.form.value.bookDate.getMinutes())
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



  // static validBookDate (control: AbstractControl): ValidationErrors{
  //   const hours = control.get('bookDate').value.getHours()
  //   const minutes = control.get('bookDate').value.getMinutes()
    
   

  // }


}

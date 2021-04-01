import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators} from '@angular/forms'
import { ReservaService } from 'src/app/services/reserva-service/reserva.service';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { Negocio } from 'src/app/model/negocio.interface';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, switchMap,tap } from 'rxjs/operators';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  form: FormGroup;
  serviciosReservados: any;
  errorMessage = "";
  negocio = {}

  negocioId = parseInt(this.route.snapshot.paramMap.get('id'));
  negocio$: Observable<Negocio> = this.route.params.pipe(
    switchMap((params: Params) => {
      const negocioId: number = parseInt(params['id']);

      return this.negocioService.findOne(negocioId).pipe(
        map((negocio: Negocio) => negocio)
        
  )
})
  )
  
  constructor( private http: HttpClient,private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute,
    private negocioService: NegocioService,private reservaService: ReservaService ) { }

  ngOnInit() {
    this.negocioService.findOne(this.negocioId).subscribe(data => this.negocio = data)
    this.form = this.formBuilder.group({
      bookDate: ['', [Validators.required]],
      emisionDate: [''],
      status: ['IN PROGRESS'],
       
      services: this.formBuilder.array([this.addServiceGroup()])
      });
    
  }

  get serviceArray(){
    return <FormArray>this.form.get('services');
  }

  addServiceGroup(){
    return this.formBuilder.group({
      id: ['']
    });
  }

  addService(){
    this.serviceArray.push(this.addServiceGroup());
  }

  removeService(index){
    this.serviceArray.removeAt(index);
  }

  save() {
    if(this.form.valid){
     
    //this.negocioService.create(this.form.value).subscribe()
    console.log(this.form.value)
    }
  }
    

  fechaActual(formulario: FormGroup) {
    let date: Date = new Date();
    this.form = this.formBuilder.group({
        bookDate: formulario.get("bookDate"),
        emisionDate: date,
        status: formulario.get("status"),

        services: formulario.get("services")
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { HttpClient } from '@angular/common/http'
import { Negocio } from 'src/app/model/negocio.interface';

@Component({
  selector: 'app-servises',
  templateUrl: './servises.component.html',
  styleUrls: ['./servises.component.css']
})
export class ServisesComponent implements OnInit {

  //url: /servises/idBusiness
  //llamar a nameService name e inicializar las bookings a vacio

  form: FormGroup;
  negocioId = parseInt(this.route.snapshot.paramMap.get('id'));
  negocio: Negocio
  constructor(private http: HttpClient,private formBuilder: FormBuilder,
  private router: Router, private route: ActivatedRoute,
  private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.negocioService.findOne(this.negocioId).subscribe(negocio=>{
      console.log(negocio.services)
      this.negocio=negocio
      this.form =this.formBuilder.group({
        services: this.formBuilder.array([])
    })
    this.initService(negocio.services)
  })
}

  initService(services){
    services.forEach(x => {
      this.serviceArray.push(this.formBuilder.group(x))
    });

    }

   get serviceArray(){
    return <FormArray>this.form.get('services');


  }

  addBlankServiceGroup(){
    return this.formBuilder.group({
      nameService: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      bookings: this.formBuilder.group({
        bookDate: [''],
        emisionDate: [''],
        status: ['']
      })
    });
  }

   addService(){
    this.serviceArray.push(this.addBlankServiceGroup());
  }

  removeService(index){
    let res = window.confirm("¿Esta seguro de que desea borrar el servicio?")
    if(res){
      this.serviceArray.removeAt(index);
    }

  }

    save() {
    if(this.form.valid){
    this.negocioService.update(this.negocioId,this.form.value).subscribe()
    this.router.navigate(['negocio-edit/'+this.negocioId])
    }
  }


}

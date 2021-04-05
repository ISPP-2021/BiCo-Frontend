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

  token = localStorage.getItem('token')
  form: FormGroup;
  negocioId = parseInt(this.route.snapshot.paramMap.get('id'));
  negocio;
  constructor(private http: HttpClient,private formBuilder: FormBuilder,
  private router: Router, private route: ActivatedRoute,
  private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.negocioService.findOne(this.negocioId).subscribe(negocio=>{
      this.negocio=negocio
      this.form =this.formBuilder.group({
        servises: this.formBuilder.array([])
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
    return <FormArray>this.form.get('servises');


  }

  addBlankServiceGroup(){
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      duration: ['', [Validators.required, Validators.min(0)]],
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
     /* console.log(this.form.value)
      this.negocioService.updateServices(this.negocioId,this.form.value).subscribe(res=>{
      this.router.navigate(['negocio-edit/'+this.negocioId])
    })*/
    let servises = this.form.value.services;
    for (let index = 0; index < servises.length; index++) {
      const service = servises[index];
      //this.negocioService.updateServices(this.negocioId,service).subscribe()
      console.log(service)
    }
    
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { HttpClient } from '@angular/common/http'

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
  constructor(private http: HttpClient,private formBuilder: FormBuilder,
  private router: Router, private route: ActivatedRoute,
  private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.negocioService.findServices(this.negocioId).subscribe(services=>{
      this.form =this.formBuilder.group({
        services: this.formBuilder.array([services])
    })
  })
}

 /* initService(services): FormGroup {
    for (let index = 0; index < services.length; index++) {
      const service = services[index];
      return this.formBuilder.group({
      nameService: [service.name,[Validators.required]],
      description: [service.description,[Validators.required]],
      price: [service.price,[Validators.required]],
      duration: [service.duration,[Validators.required]]
    });
    }

  }*/

   get serviceArray(){
    return <FormArray>this.form.get('services');


  }

  addServiceGroup(){
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
    this.serviceArray.push(this.addServiceGroup());
  }

  removeService(index){
    this.serviceArray.removeAt(index);
  }

    save() {
    if(this.form.valid){
    //this.negocioService.update(this.negocioId,this.form.value).subscribe()
    console.log(this.form.value)
    }
  }


}

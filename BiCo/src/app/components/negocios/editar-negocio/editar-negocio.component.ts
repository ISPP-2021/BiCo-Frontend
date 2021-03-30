import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { Negocio } from 'src/app/model/negocio.interface';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, switchMap,tap } from 'rxjs/operators';

@Component({
  selector: 'app-editar-negocio',
  templateUrl: './editar-negocio.component.html',
  styleUrls: ['./editar-negocio.component.css']
})
export class EditarNegocioComponent implements OnInit {

//Para navegar a esta pagina, habria que crear una funcion que ejecute this.router.navigate(['/negocio-edit/',id]), pasandole a la funcion el id del negocio

  form: FormGroup;
  negocioId = parseInt(this.route.snapshot.paramMap.get('id'));
  negocio$: Observable<Negocio> = this.route.params.pipe(
    switchMap((params: Params) => {
      const negocioId: number = parseInt(params['id']);

      return this.negocioService.findOne(negocioId).pipe(
        map((negocio: Negocio) => negocio)
  )
})
  )

  constructor(private http: HttpClient,private formBuilder: FormBuilder,
  private router: Router, private route: ActivatedRoute,
  private negocioService: NegocioService
  ) {
  }

  ngOnInit(): void{
    this.negocioService.findOne(this.negocioId).subscribe(negocio=>{
      this.form = this.formBuilder.group({
      name: [negocio.name, [Validators.required]],
      address: [negocio.address, Validators.required],
      businessType: [negocio.businessType, [Validators.required]],
      option:this.formBuilder.group({
        automatedAccept: [negocio.option.automatedAccept, [Validators.required]],
        limitAutomated: [{value:negocio.option.limitAutomated, disabled:!negocio.option.automatedAccept}],
        defaultDeposit: [negocio.option.defaultDeposit, [Validators.required]],
        depositTimeLimit: [negocio.option.depositTimeLimit, [Validators.required]]
        }),
        services: this.formBuilder.array([this.initService(negocio.services), this.addServiceGroup()])
      });


    })
  }

  initService(services): FormGroup {
    for (let index = 0; index < services.length; index++) {
      const service = services[index];
      return this.formBuilder.group({
      nameService: [service.name,[Validators.required]],
      description: [service.description,[Validators.required]],
      price: [service.price,[Validators.required]],
      duration: [service.duration,[Validators.required]]
    });
    }

  }

   get serviceArray(){
    return <FormArray>this.form.get('services');
  }

  addServiceGroup(){
    return this.formBuilder.group({
      nameService: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]]
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
    console.log(this.form.value)
    }
  }

  disable(){
    if(this.form.get('option.automatedAccept').value==true){
      this.form.get('option.limitAutomated').enable()
    }else{
      this.form.get('option.limitAutomated').disable()
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
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
      });


    })
  }

  editServices(){
    return this.router.navigate(['services-edit/'+this.negocioId])
  }


  save() {
    if(this.form.valid){
    this.negocioService.update(this.negocioId,this.form.value).subscribe()
    console.log(this.form.value)
    this.router.navigate(['home'])
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

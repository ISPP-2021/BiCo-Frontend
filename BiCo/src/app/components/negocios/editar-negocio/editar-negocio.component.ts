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
  rol = localStorage.getItem('rol')
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

  public value1: Date = new Date(2000, 2, 10)
  public value2: Date = new Date(2000, 2, 10)
  public format = 'HH:mm';

  constructor(private http: HttpClient,private formBuilder: FormBuilder,
  private router: Router, private route: ActivatedRoute,
  private negocioService: NegocioService
  ) {
  }

  ngOnInit(): void{
    this.negocioService.findOne(this.negocioId).subscribe(negocio=>{
      this.form = this.formBuilder.group({
      name: [negocio.name, Validators.required],
      address: [negocio.address, Validators.required],
      businessType: [negocio.businessType, [Validators.required]],
      openTime: [new Date("December 17, 1995 " + negocio.openTime), [Validators.required]],
      closeTime: [new Date("December 17, 1995 " + negocio.closeTime), [Validators.required]],
      option:this.formBuilder.group({
        automatedAccept: [negocio.option.automatedAccept, [Validators.required]],
        gas: [{value:negocio.option.gas, disabled:!negocio.option.automatedAccept},  [Validators.required, Validators.min(1)]],
        defaultDeposit: [negocio.option.defaultDeposit, [Validators.required,Validators.min(0), Validators.max(1)]],
        depositTimeLimit: [negocio.option.depositTimeLimit, [Validators.required, Validators.min(1)]]
        }),
      });

    })
  }

  editServices(){
    return this.router.navigate(['services-edit/'+this.negocioId])
  }


  save() {
    if(this.form.valid){
      let negocio: Negocio
      let openTime = new Date(this.form.value.openTime.setHours(this.form.value.openTime.getHours() + 1))
      let closeTime = new Date(this.form.value.closeTime.setHours(this.form.value.closeTime.getHours() + 1))
      negocio = {
        name : this.form.value.name,
        address : this.form.value.address,
        businessType : this.form.value.businessType,
        openTime : openTime.toISOString().substring(11, 16),
        closeTime : closeTime.toISOString().substring(11, 16),
        option : {
          automatedAccept : this.form.value.option.automatedAccept,
          gas : this.form.value.option.gas,
          defaultDeposit : this.form.value.option.defaultDeposit,
          depositTimeLimit : this.form.value.option.depositTimeLimit,
        }
      }
      this.negocioService.update(this.negocioId,negocio).subscribe(()=>{
        window.location.replace('/mis-negocios')
      })
    }
  }

  disable(){
    if(this.form.get('option.automatedAccept').value==true){
      this.form.get('option.gas').enable()
    }else{
      this.form.get('option.gas').disable()
    }
  }
}

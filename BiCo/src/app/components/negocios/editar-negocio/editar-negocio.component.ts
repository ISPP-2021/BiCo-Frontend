import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Params, Router} from '@angular/router';
import negocios from "../negocios.json";
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-editar-negocio',
  templateUrl: './editar-negocio.component.html',
  styleUrls: ['./editar-negocio.component.css']
})
export class EditarNegocioComponent implements OnInit {

//Para navegar a esta pagina, habria que crear una funcion que ejecute this.router.navigate(['/negocio-edit/',id]), pasandole a la funcion el id del negocio

  form: FormGroup;
  negocioId = this.route.snapshot.paramMap.get('id');
  /*negocio = this.negocioService.findOne(parseInt(this.negocioId)).pipe(
        map((negocio: Negocio) => negocio)
      );*/
  negocio = negocios.filter(el=>{
    return el.id == parseInt(this.negocioId);
  })[0]
  selected = this.negocio.tipo

  constructor(private http: HttpClient,private formBuilder: FormBuilder,
  private router: Router, private route: ActivatedRoute
  ) {
    this.http.get("https://stalion73.herokuapp.com/business/"+this.negocioId).subscribe((res:any)=>{
    console.log(res);
  });
  }

  ngOnInit(){
      this.form = this.formBuilder.group({
      nombre: [this.negocio.nombre, [Validators.required]],
      direccion: [this.negocio.direccion, Validators.required],
      tipo: [this.negocio.tipo, [Validators.required]],
      horario_apertura: [this.negocio.horario_apertura, [Validators.required]],
      horario_cierre: [this.negocio.horario_cierre, [Validators.required]],
      aforo: [this.negocio.aforo, [Validators.required]]


    });
  }

  save() {
    if(this.form.valid){
    console.log(this.form.value)
    }
}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-crear-negocio',
  templateUrl: './crear-negocio.component.html',
  styleUrls: ['./crear-negocio.component.css']
})
export class CrearNegocioComponent implements OnInit {

  form: FormGroup;
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(){
     this.form = this.formBuilder.group({
      foto: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      direccion: ['', Validators.required],
      tipo: ['', [Validators.required]],
      horario_apertura: ['', [Validators.required]],
      horario_cierre: ['', [Validators.required]],
      aforo: ['', [Validators.required]]
      });
  }
  save() {
    if(this.form.valid){
    console.log(this.form.value)
    }

}
}

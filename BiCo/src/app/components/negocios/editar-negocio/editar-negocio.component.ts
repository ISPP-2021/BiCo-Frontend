import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import negocios from "../negocios.json";

@Component({
  selector: 'app-editar-negocio',
  templateUrl: './editar-negocio.component.html',
  styleUrls: ['./editar-negocio.component.css']
})
export class EditarNegocioComponent implements OnInit {

  form: FormGroup;
  negocio = negocios[0]
  selected = this.negocio.tipo

  constructor() {
  }

  ngOnInit(){

  }

  save(event: Event) {
  event.preventDefault();
  if (this.form.valid) {
    const value = this.form.value;
    console.log(value);
  }
}

}

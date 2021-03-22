import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-view-business',
  templateUrl: './view-business.component.html',
  styleUrls: ['./view-business.component.css']
})
export class ViewBusinessComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm()
  }
  negocio =
    {
        "nombre" : "Bar pakito",
        "tipo" : "bar",
        "direccion" : "Calle Prueba, nº 1",
        "img" : "https://media-cdn.tripadvisor.com/media/photo-s/14/b3/3e/cf/restaurante-ispal.jpg"
    }

  ngOnInit(){

  }

  private buildForm() {
    this.form = this.formBuilder.group({
    nombre: [this.negocio.nombre,  [Validators.required]],
    tipo: ['', [Validators.required]],
    direccion: [this.negocio.direccion, [Validators.required]],
    });
  }

  save(event: Event) {
  event.preventDefault();
  if (this.form.valid) {
    const value = this.form.value;
    console.log(value);
  }
}

}

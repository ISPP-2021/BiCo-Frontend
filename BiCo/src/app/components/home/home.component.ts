import { Component, OnInit } from '@angular/core';
import negociosData from './negocios.json';

interface Negocio {
  id: Number;
  descripcion: String;
  nombre: String;
  direccion: String;
  etiqueta: String;
  aforo: Number;
  horario_apertura: String;
  horario_cierre: String;
  horario_dias_festivos: String;
  horario_dias_laborales: String;
  telefono: Number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Home';

  negocios: Negocio[] = negociosData;

}
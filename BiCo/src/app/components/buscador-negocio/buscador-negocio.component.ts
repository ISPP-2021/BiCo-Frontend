import { Component, OnInit } from '@angular/core';
import { FilterNegocioService } from 'src/app/services/filter-negocio-service/filter-negocio.service';

@Component({
  selector: 'app-buscador-negocio',
  templateUrl: './buscador-negocio.component.html',
  styleUrls: ['./buscador-negocio.component.css']
})
export class BuscadorNegocioComponent implements OnInit {

  constructor(private servicio:FilterNegocioService) { }
  filterCommercePost = '';
  negocios = this.servicio.getNegocios();
  tipos = this.servicio.getTiposDeNegocio();

  ngOnInit() {
    
  }

  onSelect(tipo){
      if(tipo == "")
          this.negocios = this.servicio.getNegocios();
      else
          this.negocios = this.servicio.getNegociosFilter(tipo);
      
  }

}

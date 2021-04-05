import { Component, OnInit } from '@angular/core';
import { FilterNegocioService } from 'src/app/services/filter-negocio-service/filter-negocio.service';

@Component({
  selector: 'app-buscador-negocio',
  templateUrl: './buscador-negocio.component.html',
  styleUrls: ['./buscador-negocio.component.css']
})
export class BuscadorNegocioComponent implements OnInit {

  negocios = [];
	errorMessage = "";

  

  constructor(private servicio:FilterNegocioService) { }
  filterCommercePost = '';
  tipos = ["HAIRDRESSER", "RESTAURANT", "GENERAL"];
  

  ngOnInit() {

    this.servicio.findAll().subscribe(data => this.negocios = data,
			err => this.errorMessage = err)
  
  }


  onSelect(tipo){
      if(tipo == ""){       
        this.servicio.findAll().subscribe(data => this.negocios = data,
		    	err => this.errorMessage = err);
      }else{
        this.servicio.getNegociosFilter(tipo).subscribe(data => this.negocios = data,
          err => this.errorMessage = err)
      }
  }

}

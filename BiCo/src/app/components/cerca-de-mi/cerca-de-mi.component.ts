import { Component, OnInit } from '@angular/core';
import { NegocioService } from 'src/app/services/negocio-service/negocio.service';
import { JWT_NAME } from 'src/app/services/authentication-service/authentication.service';
import { FilterNegocioService } from 'src/app/services/filter-negocio-service/filter-negocio.service';

@Component({
	selector: 'app-cerca-de-mi',
	templateUrl: './cerca-de-mi.component.html',
	styleUrls: ['./cerca-de-mi.component.css']
})
export class CercaDeMiComponent implements OnInit {

	negocios = [];
	errorMessage = "";
	token: string = localStorage.getItem(JWT_NAME);

	constructor(private negocioService: NegocioService, private servicio:FilterNegocioService) { }

	ngOnInit() {
		let output = document.getElementById('map')
		function location(posicion) {
			let latitude = posicion.coords.latitude
			let longitude = posicion.coords.longitude
			/*
			Funcion que devuelva la lista de negocios
			params: (latitud, longitude) -> Origen
			*/
			console.log(latitude)
			console.log(longitude)
		}
		function error() {
			output.innerHTML = "<p>Su posicion no se pudo obtener</p>"
		}
		navigator.geolocation.getCurrentPosition(location, error)

		this.negocioService.findAll().subscribe(data => this.negocios = data,
			err => this.errorMessage = err)

		// var service = new google.maps.DistanceMatrixService();
		// service.getDistanceMatrix({
		// 	origins: [this.origen],
		// 	destinations: this.arrayDestinos,
		// 	travelMode: google.maps.TravelMode.DRIVING
		// }, this.callback);

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

	// callback(response, status) {
	// 	if (status == 'OK') {
	// 		console.log("el estatus de la respuesta es: " + status);
	//
	// 		var origins = response.originAddresses;
	// 		var destinations = response.destinationAddresses;
	// 		console.log("Origen: " + origins + ". Destinos: " + destinations);
	//
	//
	// 		for (var i = 0; i < origins.length; i++) {
	// 			var results = response.rows[i].elements;
	// 			for (var j = 0; j < results.length; j++) {
	// 				var element = results[j];
	// 				var distance = element.distance.text;
	// 				var from = origins[i];
	// 				var to = destinations[j];
	// 				console.log("La distancia de " + from + " hasta " + to + " es de " + distance + ".");
	// 			}
	// 		}
	// 	}
	// 	else {
	// 		console.log(status);
	// 		alert("El servicio DistanceMatrix de Google falló por el siguiente motivo: " + status)
	// 	}
	// }
	// destino1 = "Calle Chaves Nogales, 8";
	// destino2 = "Calle Chaves Nogales, 7";
	// destino3 = "Calle Juan Sierra, 7";
	// arrayDestinos = [this.destino1, this.destino2, this.destino3];
	// origen= {lat:37.385474699999996, lng:-5.979364299999999};
	//
}

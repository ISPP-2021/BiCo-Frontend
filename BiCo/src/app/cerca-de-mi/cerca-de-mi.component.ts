import { NgLocaleLocalization } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cerca-de-mi',
  templateUrl: './cerca-de-mi.component.html',
  styleUrls: ['./cerca-de-mi.component.css']
})
export class CercaDeMiComponent implements OnInit {
  destino1 = "Calle Chaves Nogales, 8";
  destino2 = "Calle Chaves Nogales, 7";
  destino3 = "Calle Juan Sierra, 7";
  arrayDestinos = [this.destino1, this.destino2, this.destino3];
  origen= {lat:37.385474699999996, lng:-5.979364299999999};

  negocios = [
      {
          "nombre" : "Bar pakito",
          "tipo" : "bar",
          "servicios": [
            {
              "nombre":"Mesa para 4 máximo",
              "precio":"Gratis (Consumición minima 4€)"
            }
          ]
      },
      {
          "nombre" : "Plan B",
          "tipo" : "bar",
          "servicios": [
            {
              "nombre":"Mesa para 4 máximo",
              "precio":"Gratis (Consumición minima 4€)"
            }
          ]
      },
      {
          "nombre" : "Cien cocktelitos",
          "tipo" : "bar",
          "servicios": [
            {
              "nombre":"Mesa para 4 máximo",
              "precio":"Gratis (Consumición minima 4€)"
            }
          ]
            },
      {
          "nombre" : "Bar Fede",
          "tipo" : "bar",
          "servicios": [
            {
              "nombre":"Mesa para 4 máximo",
              "precio":"Gratis (Consumición minima 4€)"
            }
          ]
      },
      {
          "nombre": "100 montaditos",
          "tipo": "bar",
          "servicios": [
            {
              "nombre":"Mesa para 4 máximo",
              "precio":"Gratis (Consumición minima 4€)"
            }
          ]
      },
      {
          "nombre" : "La sureña",
          "tipo" : "bar",
          "servicios": [
            {
              "nombre":"Mesa para 4 máximo",
              "precio":"Gratis (Consumición minima 4€)"
            }
          ]
      },
      {
          "nombre" : "Peluquería María Teresa",
          "tipo" : "peluquería",
          "servicios": [
            {
              "nombre":"Mesa para 4 máximo",
              "precio":"Gratis. Consumición minima 4€"
            }
          ]
      },
      {
          "nombre" : "Navaja shop",
          "tipo" : "peluquería",
          "servicios": [
            {
              "nombre":"Pelado para hombre",
              "precio":"8€"
            },
            {
              "nombre":"Pelado para mujer",
              "precio":"15€"
            },
            {
              "nombre":"Tinte",
              "precio":"20€"
            }]
      },
      {
          "nombre" : "Bold Monkey",
          "tipo" : "peluquería",
          "servicios": [
            {
              "nombre":"Pelado para hombre",
              "precio":"8€"
            },
            {
              "nombre":"Pelado para mujer",
              "precio":"15€"
            },
            {
              "nombre":"Tinte",
              "precio":"20€"
            }]}
  ]
  constructor() { }

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

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix( {
        origins: [this.origen],
        destinations: this.arrayDestinos,
        travelMode:  google.maps.TravelMode.DRIVING
      }, this.callback);

  }

  callback(response, status) {
    if (status == 'OK') {
      console.log("el estatus de la respuesta es: " + status);

      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      console.log("Origen: "+ origins +". Destinos: "+destinations);


      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          var from = origins[i];
          var to = destinations[j];
          console.log("La distancia de "+ from +" hasta "+ to + " es de "+ distance +".");
        }
      }
    }
    else{
      console.log(status);
      alert("El servicio DistanceMatrix de Google falló por el siguiente motivo: "+status)
    }
  }

}

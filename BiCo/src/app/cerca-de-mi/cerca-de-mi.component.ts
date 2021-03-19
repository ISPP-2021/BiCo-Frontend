import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cerca-de-mi',
  templateUrl: './cerca-de-mi.component.html',
  styleUrls: ['./cerca-de-mi.component.css']
})
export class CercaDeMiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      let output = document.getElementById('map')
      function location(posicion) {
        let latitude = posicion.coords.latitude
        let longitude = posicion.coords.longitude
        console.log(latitude)
        console.log(longitude)
      }
      function error() {
        output.innerHTML = "<p>Su posicion no se pudo obtener</p>"
      }
      navigator.geolocation.getCurrentPosition(location, error)
  }

}

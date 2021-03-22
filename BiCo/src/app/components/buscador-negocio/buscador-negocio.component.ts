import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-negocio',
  templateUrl: './buscador-negocio.component.html',
  styleUrls: ['./buscador-negocio.component.css']
})
export class BuscadorNegocioComponent implements OnInit {

  constructor() { }
  filterCommercePost = '';
  negocios = [
    {
        "nombre" : "Bar pakito",
        "tipo" : "bar"
    },
    {
        "nombre" : "Plan B",
        "tipo" : "bar"
    },
    {
        "nombre" : "Cien cocktelitos",
        "tipo" : "bar"
    },
    {
        "nombre" : "Bar Fede",
        "tipo" : "bar"
    },
    {
        "nombre": "100 montaditos",
        "tipo": "bar"
    },
    {
        "nombre" : "La sureña",
        "tipo" : "bar"
    },
    {
        "nombre" : "Peluquería María Teresa",
        "tipo" : "peluquería"
    },
    {
        "nombre" : "Navaja shop",
        "tipo" : "peluquería"
    },
    {
        "nombre" : "Bold Monkey",
        "tipo" : "peluquería"
    }
]

  ngOnInit(): void {
  }

}

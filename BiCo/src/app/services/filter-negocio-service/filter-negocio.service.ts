import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterNegocioService {

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

  constructor() { }

  getNegocios() {
    return this.negocios;
  }

  getNegociosFilter(filtro: string){
    const negociosFiltrados = []
    for(let negocio of this.negocios){
      if(negocio.tipo == filtro){
        negociosFiltrados.push(negocio);
      }
    }
    return negociosFiltrados;
  }

  getTiposDeNegocio(){
    const tipos = []
    for(let negocio of this.negocios){
      if(tipos.includes(negocio.tipo)){
        continue;
      }else{
        tipos.push(negocio.tipo);
      }
    }
    return tipos;
  }
}

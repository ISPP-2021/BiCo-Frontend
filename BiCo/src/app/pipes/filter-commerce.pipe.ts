import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterCommerce'
})
export class FilterCommercePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length < 1) return document.getElementById("tabla-buscador").style.display = "none";
    const result = [];
    for(const negocio of value){
      if(negocio.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        result.push(negocio);
        document.getElementById("tabla-buscador").style.display = "inline";
      }
      if(("peluqueria".indexOf(arg.toLowerCase()) > -1 && negocio.businessType == "HAIRDRESSER") ||
      (("restaurante".indexOf(arg.toLowerCase()) > -1 || "bar".indexOf(arg.toLowerCase()) > -1) && negocio.businessType == "RESTAURANT") ||
      ("otros".indexOf(arg.toLowerCase()) > -1 && negocio.businessType == "GENERAL")){
        if(!result.includes(negocio)){
          result.push(negocio)
        }        
        document.getElementById("tabla-buscador").style.display = "inline";
      }
      for(const servicio of negocio.services){
        if(servicio.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
          if(!result.includes(negocio)){
            result.push(negocio)
          }
          document.getElementById("tabla-buscador").style.display = "inline";
        }
      }
    };
    return result;
  }

}

import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterCommerce'
})
export class FilterCommercePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length < 3) return value;
    const result = [];
    for(const negocio of value){
      if(negocio.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        result.push(negocio);
      };
    };
    return result;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Decision } from '../entitees/decision';

@Pipe({
  name: 'dateFiltre'
})
export class DateFiltrePipe implements PipeTransform {

  transform(list: Decision[], searchValue: string , searchValue2: string ): Decision[] {
    console.log('Dans date');
    if (!list || !searchValue){
      console.log('!list ou searchValue');
      return list;
    }
    if (searchValue && !searchValue2) {
      console.log('Dans le filtre');
      return list.filter(dec =>
        dec.dateImportation.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
     }
    if (searchValue && searchValue2){
       console.log('Deux valeur date');
       console.log(searchValue);
       console.log(searchValue2);
       return list.filter(dec =>
        dec.dateImportation.toString() > searchValue && dec.dateImportation.toString() < searchValue2);
     }
     else
     {
       return list;
     }
  }

}
// && new Date(dec.dateImportation).toString() < searchValue2

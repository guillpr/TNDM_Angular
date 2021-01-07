import { Pipe, PipeTransform } from '@angular/core';
import { Decision } from '../entitees/decision';

@Pipe({
  name: 'dateFiltre'
})
export class DateFiltrePipe implements PipeTransform {

  transform(list: Decision[], searchValue: string , searchValue2: string ): Decision[] {
    if (!list || !searchValue){
      return list;
    }
    if (searchValue && !searchValue2) {
      return list.filter(dec =>
        dec.dateImportation.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
     }
    if (searchValue && searchValue2){
       return list.filter(dec =>
        dec.dateImportation.toString() > searchValue && dec.dateImportation.toString() < searchValue2);
     }
     else
     {
       return list;
     }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Decision } from '../entitees/decision';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFiltre'
})
export class DateFiltrePipe implements PipeTransform {

  constructor(public datepipe: DatePipe){}

  transform(list: Decision[], searchValue: Date , searchValue2: string ): Decision[] {
    const valeurDateDu = this.datepipe.transform(searchValue, 'yyyy-MM-dd');
    const valeurDateAu = this.datepipe.transform(searchValue2 , 'yyyy-MM-dd');

    console.log(valeurDateDu);
    console.log(valeurDateAu);


    if (!list || !valeurDateDu){
      return list;
    }
    if (valeurDateDu && !valeurDateAu) {
      return list.filter(dec =>
        dec.dateImportation.toLocaleLowerCase().includes(valeurDateDu.toLocaleLowerCase()));
     }
    if (valeurDateDu && valeurDateAu){
       return list.filter(dec =>
        dec.dateImportation.toString() > valeurDateDu && dec.dateImportation.toString() < valeurDateAu);
     }
     else
     {
       return list;
     }
  }
}

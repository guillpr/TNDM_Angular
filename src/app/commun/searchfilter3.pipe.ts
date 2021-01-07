import { Pipe, PipeTransform } from '@angular/core';
import { Decision } from '../entitees/decision';

@Pipe({
  name: 'searchfilter3'
})
export class Searchfilter3Pipe implements PipeTransform {

  transform(list: Decision[], searchValue: string , nomParm: string ): Decision[] {
    if (!list || !searchValue){
      return list;
    }
    if (nomParm === 'rechercheNumDec'){
      return list.filter(dec =>
        dec.numeroDecision.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
    if (nomParm === 'rechercheNumDossier'){
      return list.filter(dec =>
        dec.numeroDossier.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
    if (nomParm === 'rechercheStatut'){
      return list.filter(dec =>
        dec.statut.toString().includes(searchValue.toLocaleLowerCase()));
    }
    if (nomParm === 'rechercheJuge'){
      return list.filter(dec =>
        dec.juge.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
    else{
      return list;
    }
  }
}

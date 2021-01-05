import { Pipe, PipeTransform } from '@angular/core';
import { Decision } from '../entitees/decision';

@Pipe({
  name: 'searchfilter3'
})
export class Searchfilter3Pipe implements PipeTransform {

  transform(list: Decision[], searchValue: string , nomParm: string ): Decision[] {
    console.log('searchFilter3');
    console.log(list);
    console.log(searchValue);
    console.log('nom param: ' , nomParm);
    if (!list || !searchValue){
      console.log('!list ou searchValue');
      return list;
    }
    if (nomParm === 'rechercheNumDec'){
      console.log('retourne la valeur dans Num décision.');
      return list.filter(dec =>
        dec.numeroDecision.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
    if (nomParm === 'rechercheNumDossier'){
      console.log('retourne la valeur dans Num dossier.');
      return list.filter(dec =>
        dec.numeroDossier.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
    if (nomParm === 'rechercheStatut'){
      console.log('retourne la valeur dans Statut.');
      return list.filter(dec =>
        dec.statut.toString().includes(searchValue.toLocaleLowerCase()));
    }
    if (nomParm === 'rechercheJuge'){
      console.log('retourne la valeur dans Juge.');
      return list.filter(dec =>
        dec.juge.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
    else{
      return list;
    }
  }
}

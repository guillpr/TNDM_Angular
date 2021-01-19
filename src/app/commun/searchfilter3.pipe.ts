import { Pipe, PipeTransform } from '@angular/core';
import { Decision } from '../entitees/decision';
import { FacadeService } from '../services/facade.service';

@Pipe({
  name: 'searchfilter3'
})
export class Searchfilter3Pipe implements PipeTransform {

  constructor(public facadeService: FacadeService) { }

  transform(list: Decision[], searchValue: string , nomParm: string ): Decision[] {


    
    console.log('Valeur de recherche:' , searchValue);
    console.log('nomParam:', nomParm);
    console.log('Valeur de la liste' , list);
    if (!list || !searchValue){
      console.log('retour list');
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

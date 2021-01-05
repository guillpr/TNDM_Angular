import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Decision } from '../entitees/decision';
import { FacadeService } from '../services/facade.service';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-fond-commun-adj-juge',
  templateUrl: './fond-commun-adj-juge.component.html',
  styleUrls: ['./fond-commun-adj-juge.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FondCommunAdjJugeComponent implements OnInit {

  // TODO
  displayedColumns: string[] = [
    'numeroDecision', 'numeroDossier',
    'nbDossier', 'dateImportation' ,
    'dateFinDelibere' , 'juge' , 'description' ,
    'durRestante' , 'priorite', 'statut'];

    MyDataSource: any;

  @ViewChild(MatSort) sort: MatSort;

   // TODO
    key = 'id';
    reverse = false;
    asc = false;
    desc = false;

    indicateurJuge = false;
    p = 1;
    affTableau = false;
    public listeDecisions: Decision[] = [];

    formulaire = new FormGroup({
    rechercheNumDec: new FormControl(''),
    rechercheNumDossier: new FormControl(''),
    rechercheStatut: new FormControl(''),
    rechercheJuge: new FormControl(''),
    rechercheDateDu: new FormControl(''),
    rechercheDateAu: new FormControl(''),
    NomJuge: new FormControl('')

  });


searchValue: string;
searchValue2: string;
maskValue: string;

  constructor(public facadeService: FacadeService) { }
  ngOnInit() {
     this.facadeService.obtenirDecisionList()
     .subscribe( res => {
        this.listeDecisions = res;
     });
     this.facadeService.obtenirJuges();
  }
  // public RechercherDecisionBD(){
  //   this.affTableau = false;
  //   this.facadeService.obtenirDecisionList();
  //   let requete = '';
  //   let secondCritere = false;
  //   let nonVide = false;

  //   if (!this.formulaire.dirty){
  //     requete = 'SELECT * FROM DecisionDetails';
  //   }
  //   else{
  //     requete = 'SELECT * FROM DecisionDetails WHERE';
  //   }
  //   if (this.formulaire.get('rechercheNumDec').value)
  //   {
  //     requete += ' NumeroDecision =' + '\'' + this.formulaire.get('rechercheNumDec').value + '\'';
  //     secondCritere = true;
  //     nonVide = true;
  //   }
  //   if (this.formulaire.get('rechercheNumDossier').value){
  //     if (secondCritere === true){
  //       requete += ' AND';
  //     }
  //     requete += ' NumeroDossier =' + '\'' + this.formulaire.get('rechercheNumDossier').value + '\'';
  //     secondCritere = true;
  //     nonVide = true;
  //   }
  //   if (this.formulaire.get('rechercheStatut').value && Number(this.formulaire.get('rechercheStatut').value)){
  //     if (secondCritere === true){
  //       requete += ' AND';
  //     }
  //     requete += ' Statut =' + '\'' + this.formulaire.get('rechercheStatut').value + '\'';
  //     secondCritere = true;
  //     nonVide = true;
  //   }
  //   if (this.formulaire.get('rechercheJuge').value && (this.formulaire.get('rechercheJuge').value) !== '0'){
  //     if (secondCritere === true){
  //       requete += ' AND';
  //     }
  //     requete += ' Juge  LIKE ' + '\'' + '@' + this.formulaire.get('rechercheJuge').value + '@' + '\'';
  //     secondCritere = true;
  //     nonVide = true;
  //   }
  //   alert(requete);
  //   if (nonVide === true){
  //   if (this.facadeService.list.length > 0){
  //     this.facadeService.obtenirDecisionListRecherche(requete);
  //     this.affTableau = true;
  //   }
  //   }
  // }
  public RechercherDecision(){
    this.affTableau = true;
  }
  public Renitialise(){
    this.formulaire.reset();
  }
 public correctionMasque(){
  const elementAria: HTMLElement = document.querySelector(
     '#TextBoxRechNumDoss'
 );
  if (Number(parseInt(this.searchValue2.charAt(0)))){
   this.maskValue = '000000';
  }
  else{
    this.maskValue = 'AAA-A-000000-0000';
    elementAria.setAttribute('dropSpecialCharacters' , 'false');
  }
 }
 public doFilter = (value: string) => {
  this.MyDataSource.filter = value.trim().toLocaleLowerCase();
}
}

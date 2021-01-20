import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Decision } from '../entitees/decision';
import { FacadeService } from '../services/facade.service';
import { ViewEncapsulation } from '@angular/core';
import { Juge } from '../entitees/juge';
import { Router } from '@angular/router';
import { EPriorite } from '../entitees/enums/priorite';
import {MatDatepickerModule} from '@angular/material/datepicker';



@Component({
  selector: 'app-fond-commun-adj-juge',
  templateUrl: './fond-commun-adj-juge.component.html',
  styleUrls: ['./fond-commun-adj-juge.component.css'],
  encapsulation: ViewEncapsulation.None
})




export class FondCommunAdjJugeComponent implements OnInit {

  public listeJuge: Juge[] = [];
  @ViewChild(MatSort) sort: MatSort;
    p = 1;
    affTableau = false;
    //public listeDecisions: Decision[] = [];

    public listeDureeRestante: DurRest [] = [];


    currentDate: Date;
    dateRouge = false;

    formulaire = new FormGroup({
    rechercheNumDec: new FormControl(''),
    rechercheNumDossier: new FormControl(''),
    rechercheStatut: new FormControl(''),
    rechercheSection: new FormControl(''),
    rechercheJuge: new FormControl(''),
    recherchePriorite: new FormControl(''),
    rechercheType: new FormControl(''),
    rechercheDateDu: new FormControl(''),
    rechercheDateAu: new FormControl(''),
    NomJuge: new FormControl('')

  });

searchValue: string;
searchValue2: string;
maskValue: string;

  constructor(public facadeService: FacadeService,
              public router: Router) { }
  ngOnInit() {
    // Obtenir le code usager AD
    this.facadeService.obtenirCodeUsagerAD()
    .subscribe(res => {
      console.log('Résultat AD : ' , res);
      this.facadeService.listeAd = res;
      console.log('Liste AD service de facade: ' , this.facadeService.listeAd);
      console.log('le nom utilisateur' , this.facadeService.listeAd.codeUtilisateurAD);

      console.log('Liste AD avant méthode obt Juges et Adjointes' , this.facadeService.listeAd.codeUtilisateurAD);
      this.facadeService.ObtenirJugesAdjointes(this.facadeService.listeAd.codeUtilisateurAD)
    .subscribe(resJ => {
      console.log('Le résultat du AdjointeJuges' ,  resJ);
      this.facadeService.listeJugesAdjointes = resJ;
    });
    });

    // Obtenir la liste des Juges/Adjointes




    // TODO indicateur Juge codé dur
    this.facadeService.indicateurJuge = false;
    // this.facadeService.obtenirDecisionList()
    //  .subscribe( res => {
    //     this.facadeService.listeDecisions = res;
    //  });
    // this.facadeService.obtenirJuges()
    //  .subscribe(res => {
    //    this.listeJuge = res;
    //  });
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
  if (Number(parseInt(this.formulaire.get('rechercheNumDossier').value.charAt(0)))){
   this.maskValue = '000000';
  }
  else{
    this.maskValue = 'AAA-A-000000-0000';
    elementAria.setAttribute('dropSpecialCharacters' , 'false');
  }
 }
 enMajuscule(texte: string){
  texte.toUpperCase();
 }
public SelectionDecision(numDec: string){
  this.facadeService.numDecisionTemp = numDec;
  this.router.navigateByUrl('/infoAdjointe');
}
dateDiffInDays(dd: string) {
  this.currentDate = new Date();
  // round to the nearest whole number
  const newDate = new Date(dd);

 // return Math.round(( Number(this.currentDate) - Number(dd)) / (1000 * 60 * 60 * 24));

  if (newDate > this.currentDate)
 {
   this.dateRouge = true;
 }
 else{
   this.dateRouge = false;
 }

  const nombreAjouter = { durRestante: Math.floor((Date.UTC( newDate.getFullYear(),
 newDate.getMonth(),  newDate.getDate()) -
  Date.UTC(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()) )
 / (1000 * 60 * 60 * 24))};

  this.listeDureeRestante.push(nombreAjouter);


  return  Math.floor((Date.UTC( newDate.getFullYear(),
  newDate.getMonth(),  newDate.getDate()) -
   Date.UTC(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()) )
  / (1000 * 60 * 60 * 24)).toString();

}
verifierDate(dd: string){
  this.currentDate = new Date();
  // round to the nearest whole number
  const newDate = new Date(dd);

 // return Math.round(( Number(this.currentDate) - Number(dd)) / (1000 * 60 * 60 * 24));

  if (newDate > this.currentDate)
 {
   return false;
 }
 else{
  return true;
 }

}
}

interface DurRest {
  durRestante: number;
}

import { ViewChild, Input } from '@angular/core';
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
import { DatePipe } from '@angular/common';
import { TextesService } from '../services/textes.service';



@Component({
  selector: 'app-fond-commun-adj-juge',
  templateUrl: './fond-commun-adj-juge.component.html',
  styleUrls: ['./fond-commun-adj-juge.component.css'],
  encapsulation: ViewEncapsulation.None
})




export class FondCommunAdjJugeComponent implements OnInit {

  public listeJuge: Juge[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @Input() public noMessageDateInvalide: string;

  public extensionMessage: string;

    p = 1;
    affTableau = false;
    //public listeDecisions: Decision[] = [];

    public listeDureeRestante: DurRest [] = [];


    currentDate: Date;
    dateRouge = false;

    // Message d'erreur
    dateAuPlusPetite = false;
    dateErrors = false;

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
    nomJuge: new FormControl('')

  });

searchValue: string;
searchValue2: string;
maskValue: string;

  constructor(public facadeService: FacadeService,
              public router: Router,
              public datepipe: DatePipe,
              public textesService: TextesService) { }
  ngOnInit() {
    this.noMessageDateInvalide = '';
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
  retournerValeurDate(dateMoment: any){
    const dateMomentAConvertir = new Date(dateMoment);
    const datePipe = this.datepipe.transform(dateMomentAConvertir, 'yyyy-MM-dd');
    return datePipe;
  }
  validationChampsDate(){
    let valeurDateDu = '';
    let valeurDateAu = '';
    if (this.formulaire.controls.rechercheDateDu.value){
      valeurDateDu = this.retournerValeurDate(this.formulaire.controls.rechercheDateDu.value);
      console.log('Valeur date du après conversion' , valeurDateDu);
     }
    if (this.formulaire.controls.rechercheDateAu.value){
      valeurDateAu = this.retournerValeurDate(this.formulaire.controls.rechercheDateAu.value);
      console.log('Valeur date Au après conversion' , valeurDateAu);
      }
    if (valeurDateAu < valeurDateDu ){
       this.dateAuPlusPetite = true;
       this.dateErrors = true;
       this.noMessageDateInvalide = '0001';

      }
      else{
        this.dateAuPlusPetite = false;
        this.dateErrors = false;
      }

  }
  validationDesChamps(){
    this.validationChampsDate();

  }
  public RechercherDecision(){
    this.affTableau = true;
    console.log('Valeur des champs formulaire' , this.formulaire);
    this.validationDesChamps();
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

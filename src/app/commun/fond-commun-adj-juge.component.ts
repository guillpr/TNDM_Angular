import { ViewChild, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
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
import { Recherche } from '../entitees/recherche';



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


// TODO TEST NOM JUGES
nomDesJuges: string[] = ['Bianki André', 'Villeneuve André', 'Ménard Bernard Stanley', 'Labrosse Ginette-Hélène' , 'Blain,psychologue Louise M.' , 'Gingras-Lamarre Marguerite'];
nameOfJuges = [
  { sign: true, name: 'Bianki André' },
  { sign: false, name: 'Villeneuve André' },
  { sign: false, name: 'Ménard Bernard Stanley' }
];
    p = 1;
    affTableau = false;
    //public listeDecisions: Decision[] = [];

    public listeDureeRestante: DurRest [] = [];


    currentDate: Date;
    dateRouge = false;

    // Message d'erreur
    dateAuPlusPetite = false;
    ErreurDate = false;

    formulaire = this.fb.group({
    statut: this.fb.group({
        statutImporte: new FormControl(true),
        statutPretSignature: new FormControl(true),
        statutEnCours: new FormControl(true),
        statutDepose: new FormControl(false),
        statutAnalyse: new FormControl(false),
        statutAccepte: new FormControl(false),
        statutRejete: new FormControl(false),
      }),
    rechercheNumDec: new FormControl(''),
    rechercheNumDossier: new FormControl(''),
    rechercheStatut: new FormControl(''),
    rechercheSection: new FormControl('0'),
    rechercheJuge: new FormControl(''),
    recherchePriorite: new FormControl('0'),
    rechercheType: new FormControl(''),
    rechercheDateDu: new FormControl(''),
    rechercheDateAu: new FormControl(''),
    nomJuge: new FormControl('0')

  });

searchValue: string;
searchValue2: string;
maskValue: string;

  constructor(public facadeService: FacadeService,
              public router: Router,
              public datepipe: DatePipe,
              public textesService: TextesService,
              public fb: FormBuilder) { }
  ngOnInit() {


     this.facadeService.recherche = new Recherche();
     this.facadeService.ObtenirRechercheDecision()
     .subscribe((rech => {
       this.facadeService.tableauDecision = rech;
       console.log('Juges: ' , this.facadeService.tableauDecision[0].signataires)
       console.log('Tableau de décision:' , this.facadeService.tableauDecision);
       console.log('ID document:' , this.facadeService.tableauDecision[0].idDocument)
       console.log('Résultat de la recherche: ', rech);
     }));

     console.log('Name of juges', this.nameOfJuges);

     this.noMessageDateInvalide = '';
    // Obtenir le code usager AD
     this.facadeService.obtenirCodeUsagerAD()
    .subscribe(res => {
      console.log('Résultat AD : ' , res);
      this.facadeService.listeAd = res;
      console.log('Liste AD service de facade: ' , this.facadeService.listeAd);
      console.log('le nom utilisateur' , this.facadeService.listeAd.codeReseau);

      switch (res.accesUsager) {
        case 0: {
          this.facadeService.indicateurJuge = false;
          this.router.navigateByUrl('/infoAdjointe');
          break;
        }
        case 1: {
          this.facadeService.indicateurJuge = false;
          break;
        }
        case 2: {
          this.facadeService.indicateurJuge = true;
          break;
       }
     }
      console.log('Liste AD avant méthode obt Juges et Adjointes' , this.facadeService.listeAd.codeReseau);

      // Obtenir décision triés
      this.facadeService.recherche.codeReseauDemandeur = res.codeReseau;
      this.facadeService.recherche.profil = res.accesUsager;
      console.log('Valeur de listeDecision' , this.facadeService.listeDecision);

      console.log('Liste de recherche: ' ,this.facadeService.recherche);


      // Méthode avec Trie
      // this.facadeService.obtenirDecisionListTrie(this.facadeService.recherche)
      // .subscribe((rechercheR) => {
      //   console.log('Resultat de rechercheR' , rechercheR);
      // });


      this.facadeService.ObtenirJugesAdjointes(this.facadeService.listeAd.codeReseau)
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
  reiniatialiserErreurs(){
    this.ErreurDate = false;

  }
  validationChampsDate(){
    let valeurDateDu = '';
    let valeurDateAu = '';
    console.log('Valeur date du formulaire' , this.formulaire.controls.rechercheDateDu);
    if (this.formulaire.controls.rechercheDateDu.value){
      valeurDateDu = this.retournerValeurDate(this.formulaire.controls.rechercheDateDu.value);

      const regexDate = '^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$';
      console.log('Valeur date du t' , valeurDateDu);
     // console.log("Resultat du regex " , valeurDateDu.match.toString()(regexDate));
      if (valeurDateDu.match(regexDate))
      {
        console.log('Regex match');
      }
      else{
        console.log('Regex ne match pas');
      }
      console.log('Valeur date du après conversion' , valeurDateDu);
     }
     else{
       console.log('Date non valide');
       this.ErreurDate = true;

       this.noMessageDateInvalide = '0003';
     }
    if (this.formulaire.controls.rechercheDateAu.value){
      valeurDateAu = this.retournerValeurDate(this.formulaire.controls.rechercheDateAu.value);
      console.log('Valeur date Au après conversion' , valeurDateAu);
      }
    if ((valeurDateAu && valeurDateDu) && valeurDateAu < valeurDateDu ){
      console.log('valeurDateAu < valeurDateDu');
      this.dateAuPlusPetite = true;
      this.ErreurDate = true;
      this.noMessageDateInvalide = '0001';
      }

    const date1 = new Date(valeurDateDu);
    const date2 = new Date(valeurDateAu);

    const diffDate = date2.getTime() - date1.getTime();
    const diffEnJour = diffDate / (1000 * 3600 * 24);

    console.log('Différence date: ' , diffEnJour);

    console.log('Date 1' , date1);
    if (diffEnJour > 365) {
      console.log('> 365');
      this.noMessageDateInvalide = '0002';
      this.ErreurDate = true;
      }
      else{
        this.dateAuPlusPetite = false;
      }
  }
  validationDesChamps(){
    this.reiniatialiserErreurs();
    if (this.formulaire.controls.rechercheDateDu.value || this.formulaire.controls.rechercheDateAu.value){
      this.validationChampsDate();
    }
  }
  public RechercherDecision(){
    this.affTableau = true;
    console.log('Valeur des champs formulaire' , this.formulaire);
    this.validationDesChamps();
  }
  public Renitialise(){
   this.formulaire.reset();
   this.valeursParDefault();
  }
  valeursParDefault(){
    this.formulaire.get('nomJuge').setValue(0);
    this.formulaire.get('rechercheSection').setValue(0);
    this.formulaire.get('recherchePriorite').setValue(0);
    this.formulaire.get('statut').get('statutImporte').setValue(true);
    this.formulaire.get('statut').get('statutPretSignature').setValue(true);
    this.formulaire.get('statut').get('statutEnCours').setValue(true);
    this.formulaire.updateValueAndValidity();
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
public SelectionDecision(numDocument: number){
  this.facadeService.numDecisionTemp = numDocument;
  console.log('Num docu' , numDocument);
  this.router.navigateByUrl('/infoAdjointe');
}
}
interface DurRest {
  durRestante: number;
}

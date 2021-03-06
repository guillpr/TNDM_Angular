import { ViewChild, Input, HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
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
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';
import { environment } from 'src/environments/environment.preprod';
import { MatDialog } from '@angular/material/dialog';
import { BoiteDialogueJugeComponent } from '../contenu/boite-dialogue-juge.component';

const validDatePlusUnAn: ValidatorFn = (ctrl: AbstractControl) => {
  const dateMomentConvAu = moment(ctrl.get('rechercheDateDu').value).format('YYYY-MM-DD');
  const dateMomentConvDu = moment(ctrl.get('rechercheDateAu').value).format('YYYY-MM-DD');
  console.log('Date au:' , dateMomentConvAu);
  console.log('Date du:' , dateMomentConvDu);
  const dateDuJour = new Date();
  const momentNewDateAu = new Date(dateMomentConvAu);
  const momentNewDateDu = new Date(dateMomentConvDu);
  console.log('Moment date au get time' ,  momentNewDateAu.getTime());
  console.log('Moment date du get time' ,  momentNewDateDu.getTime());
  const diffDate = momentNewDateDu.getTime() - momentNewDateAu.getTime() ;
 // const diffDate = momentNewDateAu.getTime() - dateDuJour.getTime();

  const diffEnJour = diffDate / (1000 * 3600 * 24);
  console.log('DIFF DATE ' , diffEnJour);

  if (diffEnJour > 365) {

      return { erreurDatePlusUnAn: true };
    }

  // if (diffEnJour < -731 && momentNewDateDu.getTime() >  momentNewDateAu.getTime()) {
  //   console.log('erreur moins de deux an');
  //     return { erreurDateMoinsDeuxAn: true };
  //   }

  if(momentNewDateAu.getTime() >  momentNewDateDu.getTime()){
      return {erreurDateDuPlusGrand: true}
    }

  return null;
  };




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

  regexPattern = '^[0-9\.\-\/]+$';




  public extensionMessage: string;



    p = 1;
    affTableau = false;
    // public listeDecisions: Decision[] = [];

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
    rechercheSection: new FormControl('Toutes'),
    rechercheJuge: new FormControl(''),
    recherchePriorite: new FormControl('Toutes'),
    rechercheType: new FormControl(''),
    rechercheDateDu: ['' , this.validDate],
    rechercheDateAu: ['' , this.validDate],
    nomJuge: new FormControl('Toutes mes décisions')

  }, { validator: [validDatePlusUnAn]}
  );


  /*
   // Formulaire
  formulaire = this.fb.group({
    description: ['', [Validators.required , Validators.maxLength(125)], ],
    dateDelibere:['' , this.validDate],
    priorite: new FormControl(''),
    numero: new FormControl({value: '', disabled: true}),
    importePar: new FormControl({value: '', disabled: true}),
    dateImportation: new FormControl({value: '', disabled: true}),
    dureeRestante: new FormControl({value: '', disabled: true}),
    statut: new FormControl({value: '', disabled: true}),
    redacteur0: new FormControl({value: false, disabled: true}),
    redacteur1: new FormControl({value: false, disabled: true}),
    redacteur2: new FormControl({value: false, disabled: true}),
    redacteur3: new FormControl({value: false, disabled: true}),
    redacteur4: new FormControl({value: false, disabled: true})
  }, { validator: [validDatePlusUnAn]});

  */

searchValue: string;
searchValue2: string;
maskValue: string;
valeurDuTri = 'ASC';

@HostListener('document:keydown', ['$event'])
onKeyDown(evt: KeyboardEvent) {
  const valeurTarget = evt.target as Element;
  if (
    evt.which === 8 &&
    (
      valeurTarget.nodeName !== 'INPUT' && valeurTarget.nodeName !== 'SELECT' )
  ) {
    evt.preventDefault();
  }
}

  constructor(public facadeService: FacadeService,
              public router: Router,
              public datepipe: DatePipe,
              public textesService: TextesService,
              public dialog: MatDialog,
              private spinner: NgxSpinnerService,
              public fb: FormBuilder) { }




  ngOnInit() {
    window.scrollTo(0, 0);

    this.facadeService.recherche = new Recherche();



    // this.facadeService.ObtenirRechercheDecision()
    //  .subscribe((rech) => {
    //    this.facadeService.tableauDecision = rech;
    //    console.log('Juges: ' , this.facadeService.tableauDecision[0].signataires)
    //    console.log('Tableau de décision:' , this.facadeService.tableauDecision);
    //    console.log('ID document:' , this.facadeService.tableauDecision[0].idDocument)
    //    console.log('Résultat de la recherche: ', rech);
    //  },
    //  (err) => {console.log('Une erreur est survenue lors de l\'appel des données de la recherche')}
    //  );



    this.noMessageDateInvalide = '';
    this.spinner.show();
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
          this.router.navigateByUrl('/accesRefuse');
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

        // Valeurs par défault du recherche
      this.facadeService.recherche.codeReseauDemandeur = res.codeReseau;
      // this.facadeService.recherche.profil = res.accesUsager;
      this.facadeService.recherche.profil = res.accesUsager;
      this.facadeService.recherche.statuts = [1, 2, 3];
      this.facadeService.recherche.adjointesJuges = 'Toutes mes décisions';
      this.facadeService.recherche.dateDebutImportation = new Date('0001-01-01');
      this.facadeService.recherche.dateFinImportation = new Date('0001-01-01');

      // Vidé valeur null
      this.facadeService.recherche.section = '';
      this.facadeService.recherche.numero = '';
      this.facadeService.recherche.priorite = '';


      console.log('Valeur de listeDecision' , this.facadeService.listeDecision);

      console.log('Liste de recherche: ' , this.facadeService.recherche);
      this.facadeService.obtenirDecisionListTrie(this.facadeService.recherche)
    .subscribe((resR) => {
      this.facadeService.tableauDecision = resR;
      console.log('Liste dossiers:' , this.facadeService.tableauDecision[0].dossiersTAQ[0].noDossierTAQ);
      this.spinner.hide();
      console.log('Résultat recherche trié: ' , resR);
    },
    (err) => { console.log('Une erreur est survenue lors de l\'appel des données de la recherche') ,  this.spinner.hide()}
    );


      this.facadeService.ObtenirJugesAdjointes(this.facadeService.listeAd.codeReseau)
    .subscribe(resJ => {
      console.log('Le résultat du AdjointeJuges' ,  resJ);
      this.facadeService.listeJugesAdjointes = resJ;
      this.spinner.hide();
    });
    }, (err) => {console.log('Erreur lors de l\'obtention du code Usager AD' ,  this.spinner.hide()); }
    );
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
  validDate(control: FormControl): {[key: string]: any}|null
  {
  const dateVal = control.value;
  if (control && dateVal && !moment(dateVal, 'YYYY-MM-DD', true).isValid()) {
    return { dateVaidator: true };
  }
  return null;
}
 // }
  // console.log('Date val:' ,dateVal);
  // return moment(dateVal, 'YYYY-MM-DD', true).isValid() ?
  // null : {
  // invalidDate: true
  // }
  //}
  retournerValeurDate(dateMoment: any){
    const dateMomentAConvertir = new Date(dateMoment);
    const datePipe = this.datepipe.transform(dateMomentAConvertir, 'yyyy-MM-dd');
    return datePipe;
  }
  reiniatialiserErreurs(){
    console.log('Dans erreur false');
    this.ErreurDate = false;

  }
  validationChampsDate(){

console.log('Dans validation champs date');
// if (moment(this.formulaire.controls.rechercheDateDu.value, ' yyyy-MM-dd').isValid()
//     && moment(this.formulaire.controls.rechercheDateAu.value, ' yyyy-MM-dd').isValid()){
//       console.log('Date du valide');
//     }
//     else{
//       if (this.formulaire.controls.rechercheDateAu.value){
//         console.log(this.formulaire.controls.rechercheDateAu.value);
//         console.log('Date invalide if');
//         this.ErreurDate = true;
//         this.noMessageDateInvalide = '0003';
//       }
//       else if (this.formulaire.controls.rechercheDateAu.value == null){
//         console.log('Date invalide null');
//         this.ErreurDate = true;
//         this.noMessageDateInvalide = '0003';
//       }
//     }

  // console.log(moment(this.formulaire.controls.rechercheDateDu.value,' yyyy-MM-dd').isValid());
let valeurDateDu = '';
let valeurDateAu = '';
console.log('Valeur date du formulaire' , this.formulaire.controls.rechercheDateDu);
if (this.formulaire.controls.rechercheDateDu.value){
       valeurDateDu = this.retournerValeurDate(this.formulaire.controls.rechercheDateDu.value);
    }

    //   const regexDate = '^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$';
    //   console.log('Valeur date du t' , valeurDateDu);
    //  // console.log("Resultat du regex " , valeurDateDu.match.toString()(regexDate));
    //   if (valeurDateDu.match(regexDate))
    //   {
    //     console.log('Regex match');
    //   }
    //   else{
    //     console.log('Regex ne match pas');
    //   }
    //   console.log('Valeur date du après conversion' , valeurDateDu);
    //  }
    //  else{
    //    console.log('Date non valide');
    //    this.ErreurDate = true;

    //    this.noMessageDateInvalide = '0003';
    //  }
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
if (valeurDateAu && !valeurDateDu){
        console.log('Pas de valeur date du et valeur date au' , valeurDateAu);
        this.ErreurDate = true;
        this.noMessageDateInvalide = '0006';
      }
if (!valeurDateAu && valeurDateDu){
        console.log('Pas de valeur date du et valeur date au' , valeurDateAu);
        this.ErreurDate = true;
        this.noMessageDateInvalide = '0007';
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
    this.formulaire.controls.rechercheDateDu.setErrors(null);
    this.formulaire.controls.rechercheDateAu.setErrors(null);
    this.noMessageDateInvalide = '';

    // Déposer valeur de date dans une constante
    const constDateDu = this.formulaire.controls.rechercheDateDu.value;
    const constDateAu = this.formulaire.controls.rechercheDateAu.value;

    console.log('Valeur const Du:' , constDateDu);
    console.log('Valeur const Au:' , constDateAu);
    console.log('Valeur du formalaire pour voir erreurs: ', this.formulaire);
    // if (constDateAu == null && constDateDu == null){
    //   console.log('NULL NULL')
    //   this.ErreurDate = true;
    //   this.noMessageDateInvalide = '0003';
    //   this.formulaire.controls.rechercheDateDu.setErrors({erreurFormatDate: true});
    //   this.formulaire.controls.rechercheDateAu.setErrors({erreurFormatDate: true});

    // }
    // if (constDateAu == null && constDateDu){
    //   this.ErreurDate = true;
    //   this.noMessageDateInvalide = '0005';
    //   this.formulaire.controls.rechercheDateAu.setErrors({erreurFormatDate: true});
    // }
    // if (constDateAu === '' && constDateDu == null){
    //   console.log('constDateau vide et constDateDu null')
    //   this.ErreurDate = true;
    //   this.noMessageDateInvalide = '0004';
    //   this.formulaire.controls.rechercheDateDu.setErrors({erreurFormatDate: true});
    // }
    if (!this.ErreurDate){
      this.validationChampsDate();

    }

    // const dateAu = this.formulaire.controls.rechercheDateDu.value;
    // console.log('VALEUR DATE: DU '  , dateAu);
    // console.log('VALEUR DATE: AU '  , this.formulaire.controls.rechercheDateAu.value);
    // if (this.formulaire.controls.rechercheDateDu.value && this.formulaire.controls.rechercheDateAu.value){
    //   console.log('Dans le if les deux valeurs ne sont pas vide');
    //   this.validationChampsDate();
    // }
    // if (this.formulaire.controls.rechercheDateDu.value && this.formulaire.controls.rechercheDateAu.value !== null ){
    //   console.log('Dans le if Du pas vide');
    //   this.validationChampsDate();
    // }
    // if(this.formulaire.controls.rechercheDateDu.value == null ){
    //   console.log('Dans else date invalide');
    //   this.ErreurDate = true;
    //   this.noMessageDateInvalide = '0003';
    //   if(this.formulaire.controls.rechercheDateDu.value == null){
    //     this.formulaire.get('rechercheDateDu').setValue('');
    //   }
    //   if(this.formulaire.controls.rechercheDateAu.value == null){
    //     this.formulaire.get('rechercheDateAu').setValue('');
    //   }
  //  }

  }
  public RechercherDecision(){
    this.affTableau = true;
    this.ErreurDate = true;
    console.log('Valeur des champs formulaire' , this.formulaire);
    this.validationDesChamps();

    this.remplirRechercheAvecFormulaire();
  }
  remplirRechercheAvecFormulaire(){
    this.videValeur();
    this.remplirStatut();
    this.remplirAutresChamps();

    // Envoyer recherche

    console.log('rechercher:' , this.facadeService.recherche);
    if (!this.ErreurDate){
      this.spinner.show();
      this.facadeService.obtenirDecisionListTrie(this.facadeService.recherche)
      .subscribe((resultat) => {
        this.facadeService.tableauDecision = resultat;
        console.log('Valeur du résultat trié' , resultat);
        this.spinner.hide();

      },
      (erreur) => {console.log('Erreur lors de l\'obtention des valeurs triées' ,  this.spinner.hide()); }
      );
    }




    console.log('Valeur des champs formulaire ' , this.formulaire);
    console.log('Valeur de recherche après remplisage ' , this.facadeService.recherche);
      //this.facadeService.recherche.statuts.push()
    }
    remplirAutresChamps(){
      if (this.formulaire.get('nomJuge').value){
        this.facadeService.recherche.adjointesJuges = this.formulaire.get('nomJuge').value;
      }
      if (this.formulaire.get('rechercheSection').value){
        if (this.formulaire.get('rechercheSection').value === 'Toutes'){
          this.facadeService.recherche.section = '';
        }
        else{
          this.facadeService.recherche.section = this.formulaire.get('rechercheSection').value;
        }
      }
      if (this.formulaire.get('rechercheNumDec').value){
        this.facadeService.recherche.numero = this.formulaire.get('rechercheNumDec').value;
      }
      if (this.formulaire.get('rechercheNumDossier').value){
        this.facadeService.recherche.noDossierTAQ = Number(this.formulaire.get('rechercheNumDossier').value);
      }
      if (this.formulaire.get('rechercheDateDu').value){
        this.facadeService.recherche.dateDebutImportation = new Date(this.formulaire.controls.rechercheDateDu.value);
      }
      if (this.formulaire.get('rechercheDateAu').value){
       // const datePipe = this.datepipe.transform(this.formulaire.get('rechercheDateAu').value, 'yyyy-MM-dd');
      //  console.log('Date pipe:' , datePipe);
        this.facadeService.recherche.dateFinImportation = new Date(this.formulaire.controls.rechercheDateAu.value);
      }
      if (this.formulaire.get('recherchePriorite').value){
        if (this.formulaire.get('recherchePriorite').value === 'Toutes'){
          this.facadeService.recherche.priorite = '';
        }
        else{
          this.facadeService.recherche.priorite = this.formulaire.get('recherchePriorite').value;
        }
      }


     /* rechercheNumDec: new FormControl(''),
      rechercheNumDossier: new FormControl(''),
      rechercheStatut: new FormControl(''),
      rechercheSection: new FormControl('0'),
      rechercheJuge: new FormControl(''),
      recherchePriorite: new FormControl('0'),
      rechercheType: new FormControl(''),
      rechercheDateDu: new FormControl(''),
      rechercheDateAu: new FormControl(''),
      nomJuge: new FormControl('0')
      */
    }
    videValeur(){
      this.facadeService.recherche.statuts = [];
      this.facadeService.recherche.adjointesJuges = '';
      this.facadeService.recherche.section = '';
      this.facadeService.recherche.numero = '';
      this.facadeService.recherche.noDossierTAQ = 0;
      this.facadeService.recherche.dateDebutImportation = new Date('0001-01-01');
      this.facadeService.recherche.dateFinImportation = new Date('0001-01-01');
      this.facadeService.recherche.priorite = '';

    }

  remplirStatut(){
    // Statuts
    // 1 : Importé,
    // 2: Prêt pour signature
    // 3: En cours
    // 4: Déposé
    // 5: Analysé
    // 6: Accepté
    // 7: Rejeté
    if (this.formulaire.get('statut').get('statutImporte').value === true){
      this.facadeService.recherche.statuts.push(1);
    }
    if (this.formulaire.get('statut').get('statutPretSignature').value === true){
      this.facadeService.recherche.statuts.push(2);
    }
    if (this.formulaire.get('statut').get('statutEnCours').value === true){
      this.facadeService.recherche.statuts.push(3);
    }
    if (this.formulaire.get('statut').get('statutDepose').value === true){
      this.facadeService.recherche.statuts.push(4);
    }
    if (this.formulaire.get('statut').get('statutAnalyse').value === true){
      this.facadeService.recherche.statuts.push(5);
    }
    if (this.formulaire.get('statut').get('statutAccepte').value === true){
      this.facadeService.recherche.statuts.push(6);
    }
    if (this.formulaire.get('statut').get('statutRejete').value === true){
      this.facadeService.recherche.statuts.push(7);
    }
  }
  public Renitialise(){
    this.ErreurDate = false;
    this.formulaire.reset();
 // this.viderValeurs();
    console.log('AVANT VALEURS PAR DÉFAULT');
    this.valeursParDefault();
  }
  valeursParDefault(){
    console.log('Dans valeurs par défautl');
    this.formulaire.controls.nomJuge.setValue('Toutes mes décisions');
    this.formulaire.get('rechercheSection').setValue('Toutes');
    this.formulaire.get('recherchePriorite').setValue('Toutes');
    this.formulaire.get('statut').get('statutImporte').setValue(true);
    this.formulaire.get('statut').get('statutPretSignature').setValue(true);
    this.formulaire.get('statut').get('statutEnCours').setValue(true);
    this.formulaire.get('rechercheDateDu').setValue('');
    this.formulaire.get('rechercheDateAu').setValue('');
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
public SelectionDecision(numDocument: number , index: number){
  if (this.facadeService.indicateurJuge === false){
    this.facadeService.numDecisionTemp = numDocument;
    console.log('Num docu' , numDocument);
    this.router.navigateByUrl('/infoAdjointe');
  }
  else{
 if( this.facadeService.tableauDecision[index].codeReseauSignataire !== ''
  && this.facadeService.listeAd.codeReseau === this.facadeService.tableauDecision[index].codeReseauSignataire){
  console.log('Indicateur juge = true');
  console.log('Valeur de index:' , index);
  console.log(this.facadeService.tableauDecision[0].urlVoute);
  const urlVoute = this.facadeService.tableauDecision[index].urlVoute;
  console.log('URL voute:' , urlVoute);
  window.open(urlVoute, '_blank');
 }
 if(this.facadeService.tableauDecision[index].statut === 'Accepté'
 && this.facadeService.tableauDecision[index].urlDecisionPDFFinale !== null){
  const urlVoute = this.facadeService.tableauDecision[index].urlDecisionPDFFinale;
  console.log('URL voute:' , urlVoute);
  window.open(urlVoute, '_blank');
 }

  }

}
changerValeurTri(elementHtml: any){
  console.log('Valeur de élément html:' , elementHtml);
  const elem = elementHtml;
  const valeurColonne = elem.getAttribute('data-name');
  console.log('Valeur de la colonne' , valeurColonne);
 // this.attValFormulaire(valeurColonne);



  if (this.valeurDuTri === 'ASC'){
    elem.setAttribute('data-name', Number(valeurColonne) + 1);
    this.facadeService.recherche.triRecherche = Number(valeurColonne);
    this.valeurDuTri = 'DESC';

  }
  else{
    elem.setAttribute('data-name', Number(valeurColonne) - 1);
    this.facadeService.recherche.triRecherche = Number(valeurColonne);
    this.valeurDuTri = 'ASC';
  }
  this.lancerRechercheTri();
}
lancerRechercheTri(){
  console.log('Valeur du formulaire' , this.formulaire);
  console.log('Valeur de l\'objet recherche');
/*
  this.facadeService.obtenirDecisionListTrie(this.facadeService.recherche)
    .subscribe((resR) => {
      this.facadeService.tableauDecision = resR;
      console.log('Résultat recherche trié: ' , resR);
    },
    (err) => { console.log('Une erreur est survenue lors de l\'appel des données de la recherche')}
    );
*/


  this.facadeService.obtenirDecisionListTrie(this.facadeService.recherche)
  .subscribe((res) => {
    this.facadeService.tableauDecision  = res;
    console.log('Résultat:' , res);
  },
  (err) => {console.log('Erreur triage')}
  );

}
historiqueJuge(numDocument: number , index: number){
  this.facadeService.numDecisionTemp = numDocument;
  // const url = this.router.serializeUrl(
  //   this.router.createUrlTree([ this.facadeService.dossierEnv + '/infoJuge' , numDocument ])
  // );
  // window.open(url, '_blank' );




  const donnees = {
    texte: '',
    titre: '',
    texteBoutonOui: this.textesService.obtenirTexte('commun.oui'),
    texteBoutonNon: this.textesService.obtenirTexte('commun.non'),
    afficherBoutonOui: true,
    reponse: '',
    dataKey: numDocument

  };
  const dialog = this.dialog.open(BoiteDialogueJugeComponent, { width: '750px', height:'auto',
 data: donnees,
 ariaLabelledBy: 'titre-dialog',
 ariaDescribedBy: 'contenu-dialogue'});
  dialog.afterClosed().subscribe(() => {
    if (this.facadeService.reponseSuppressionFichier){
      console.log('SI suppresion fichier');

      this.formulaire.reset();
      this.dialog.closeAll();
    }
    else{
      this.dialog.closeAll();
    }
 });
  return dialog;





 // this.router.navigateByUrl('/infoJuge');
// infoJuge
}

}
interface DurRest {
  durRestante: number;
}

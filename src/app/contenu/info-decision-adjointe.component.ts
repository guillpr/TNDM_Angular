import { Decision } from './../entitees/decision';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Pipe } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnyARecord } from 'dns';
import { map } from 'rxjs/operators';
import { BoiteDialogueComponent } from '../commun/boite-dialogue.component';
import { FacadeService } from '../services/facade.service';
import { TextesService } from '../services/textes.service';
import { DatePipe } from '@angular/common';
import { RetourDecision } from '../entitees/RetourDecision';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-info-decision-adjointe',
  templateUrl: './info-decision-adjointe.component.html',
  styleUrls: ['./info-decision-adjointe.component.css']
})
export class InfoDecisionAdjointeComponent implements OnInit {
  numDecSelectionner: string;

  boiteDecisionOuverte = false;
  boiteDossAss = false;
  boiteSignature = false;
  boiteHistorique = false;
  prioSelected = '';
  couleurPrio = false;
  changementDate = false;

  //public listeDecision: Decision[];

  boutonSauvegardeModif = false;

  isEnabled = true;

  // Variables valeur de départ
  valDepDescription = '';
  valDepDateDelibere: Date;
  valDepPriorite = '';

  // Variables à envoyer à la bd
  valDescription = '';
  valDateDelibere = '';
  valPriorite = '';

  // Mail
  email: string;
  emailSubject: string;

  // Formulaire
  formulaire = this.fb.group({
    description: new FormControl(''),
    dateDelibere: new FormControl(''),
    priorite: new FormControl(''),
    numero: new FormControl({value: '', disabled: true}),
    importePar: new FormControl({value: '', disabled: true}),
    dateImportation: new FormControl({value: '', disabled: true}),
    dureeRestante: new FormControl({value: '', disabled: true}),
    statut: new FormControl({value: '', disabled: true}),
  });

  constructor(public facadeService: FacadeService,
              public dialog: MatDialog,
              public textesService: TextesService,
              public datepipe: DatePipe,
              public fb: FormBuilder,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //this.spinner.show();


    this.facadeService.ObtenirInfosDecision(7)
    .subscribe((s) => {
        console.log('Valeur du resultat' , s);
        this.formulaire.controls.numero.setValue(s.identifiant);
        this.formulaire.controls.description.setValue(s.description);
        this.formulaire.controls.importePar.setValue(s.codeReseauDepot);
        this.formulaire.controls.dateImportation.setValue(this.datepipe.transform(s.dateImportation, 'yyyy-MM-dd'));
        this.formulaire.controls.dateDelibere.setValue(s.dateFinDelibere);
        this.formulaire.controls.dureeRestante.setValue(s.dureeRestante);
        this.formulaire.controls.priorite.setValue(s.priorite);
        this.formulaire.controls.statut.setValue(s.statut);




        this.facadeService.listeDecision = s;
        //this.buttonDisabled = false;
        //this.formulaire.controls.description.setValue(s.description);
        //this.messageErreurImport = false;
        // this.spinner.hide();
        // if ( s.signataires != null)
        // {
        //   console.log('Ajout de juge');
        //   this.ajoutJuges(s);

       // }
    });


    this.facadeService.ObtenirInfosDecision(7)
    .subscribe((r) => {
      console.log('Valeur du r' , r);
      this.facadeService.listeDecision  = r;
      console.log('Liste décisions services facade:' , this.facadeService.listeDecision);


     // console.log('liste decision [0]' , this.facadeService.listeDecision.toString().description);

      // Remplir les valeurs de départ
    //  this.valDepDescription = this.facadeService.listeDecision[0].description;
   //   this.valDepDateDelibere = this.facadeService.listeDecision[0].dateFinDelibere;
  //    this.valDepPriorite = this.facadeService.listeDecision[0].priorite;

  //    console.log('DossierTAQ:' ,this.facadeService.listeDecision[0].dossiersTAQ);



      // Assigner FormControl
      // this.formulaire.get('description').setValue(this.valDepDescription);
      // this.formulaire.get('dateDelibere').setValue(this.valDepDateDelibere);
      // this.formulaire.get('priorite').setValue(this.valDepPriorite);
      // this.formulaire.get('numero').setValue(this.facadeService.listeDecision[0].identifiant);
      // this.formulaire.get('importePar').setValue(this.facadeService.listeDecision[0].codeReseauDepot);



      this.spinner.hide();

    });

    console.log('Liste de décision: ', this.facadeService.listeDecision);




 // TODO mail
    this.email = 'proulxguill@gmail.com';
    this.emailSubject = 'TNDM - rejet de décision';
    // TODO statut juge codé dur
    this.facadeService.indicateurJuge = false;
    this.couleurPrio = true;
    this.numDecSelectionner = this.facadeService.numDecisionTemp;
  }

  ouvertureBoiteDecision(){
    this.boiteDecisionOuverte = true;
  }
  fermetureBoiteDecision(){
    this.boiteDecisionOuverte = false;
  }
  ouvertureBoiteDossAss(){
    this.boiteDossAss = true;
  }
  fermetureBoiteDossAss(){
    this.boiteDossAss = false;
  }
  ouvertureBoiteSignature(){
    this.boiteSignature = true;
  }
  fermetureBoiteSignature(){
    this.boiteSignature = false;
  }
  ouvertureBoiteHistorique(){
    this.boiteHistorique = true;
  }
  fermetureBoiteHistorique(){
    this.boiteHistorique = false;
  }
  getColor(event: any){
    this.boutonSauvegardeModif = true;
    this.prioSelected = event.target.value;
    const valeurPrio = event.target.value;
    if (valeurPrio === '1'){
      this.couleurPrio = true;
    }
    else{
      this.couleurPrio = false;
    }
  }
  rejeterDecision(){
        const donnees = {
          texte: 'Cette décision sera supprimée définitivement de TNDM',
          titre: 'Confirmation',
          texteBoutonOui: this.textesService.obtenirTexte('commun.oui'),
          texteBoutonNon: this.textesService.obtenirTexte('commun.non'),
          afficherBoutonOui: true,
          reponse: ''
        };
        return this.dialog.open(BoiteDialogueComponent, {
          width: '450px',
          data: donnees,
          ariaLabelledBy: 'titre-dialog',
          ariaDescribedBy: 'contenu-dialogue'
        }).afterClosed().pipe(
          map(() => donnees.reponse === 'O')
        );
  }
  editionDescription(){


    const inputDesc: HTMLElement = document.querySelector(
      '#inputDescription'
  );
    if (this.isEnabled === false)
  {
    this.isEnabled = true;
  }
  else{
    this.isEnabled = false;
  }
  }

  afficheBouton(){
    this.boutonSauvegardeModif = true;
  }
  sauvegarderChangements(){

    this.verifierSiChangements();
    console.log('Valeur description' , this.valDescription);
    console.log('Valeur date delibéré' , this.valDateDelibere);
    console.log('Valeur priorité' , this.valPriorite);
    this.facadeService.modifieInfoDecision(5, this.valDescription, this.valDateDelibere, this.valPriorite,this.changementDate)
    .subscribe(resJ => {
      console.log('Le résultat Put décision' ,  resJ);
    });
    this.boutonSauvegardeModif = false;
  }
  retournerValeurDate(dateMoment: any){
    const dateMomentAConvertir = new Date(dateMoment);
    const datePipe = this.datepipe.transform(dateMomentAConvertir, 'yyyy-MM-dd');
    return datePipe;
  }
  verifierSiChangements(){
    if (this.formulaire.get('description').value !== this.valDepDescription){
      if( this.formulaire.get('description').value){
        this.valDescription =  this.formulaire.get('description').value;
      }

    }
    else{
      this.valDescription = '';
    }
    if (this.formulaire.get('dateDelibere').value !== this.valDepDateDelibere) {
      if(this.formulaire.get('dateDelibere').value === ''){
        this.valDateDelibere = '0001-01-01';
      }
      else{
        this.valDateDelibere = this.retournerValeurDate(this.formulaire.get('dateDelibere').value);
      }
      this.changementDate = true;
     }
     else{
      this.valDateDelibere = '0001-01-01';
      this.changementDate = false;
    }
    if (this.formulaire.get('priorite').value !== this.valDepPriorite){
      if(this.formulaire.get('priorite').value === 1){
        this.valPriorite = 'Urgente';
      }
      else{
        this.valPriorite = 'Normale';
      }
     }
     else{
      this.valPriorite = '';
    }
  }

}


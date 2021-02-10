import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Pipe } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoiteDialogueComponent } from '../commun/boite-dialogue.component';
import { FacadeService } from '../services/facade.service';
import { TextesService } from '../services/textes.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';

@Component({
  selector: 'app-info-decision-adjointe',
  templateUrl: './info-decision-adjointe.component.html',
  styleUrls: ['./info-decision-adjointe.component.css']
})
export class InfoDecisionAdjointeComponent implements OnInit {
  numDecSelectionner: number;

  boiteDecisionOuverte = false;
  boiteDossAss = true;
  boiteSignature = true;
  boiteHistorique = true;
  prioSelected = '';
  couleurPrio = false;
  changementDate = false;

  pdfClique = false;

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
    description: ['', [Validators.required]],
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
  });

  constructor(public facadeService: FacadeService,
              public dialog: MatDialog,
              public textesService: TextesService,
              public router: Router,
              public datepipe: DatePipe,
              public fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pdfClique = false;
    //this.spinner.show();
    this.numDecSelectionner = this.facadeService.numDecisionTemp;


    console.log('Numéro de la décsion sélectionné:' , this.numDecSelectionner);
    if (this.numDecSelectionner === undefined){
      this.router.navigateByUrl('/');
    }
    this.facadeService.ObtenirInfosDecision(this.numDecSelectionner)
    .subscribe((s) => {
        console.log('Valeur du resultat' , s);
        this.formulaire.controls.numero.setValue(s.identifiant);
        this.formulaire.controls.description.setValue(s.description);
        this.formulaire.controls.importePar.setValue(s.codeReseauDepot);
        this.formulaire.controls.dateImportation.setValue(this.datepipe.transform(s.dateImportation, 'yyyy-MM-dd'));
        console.log('Valeur de dateFinDelibere:' , this.datepipe.transform(s.dateFinDelibere, 'yyyy-MM-dd'));
        if (this.datepipe.transform(s.dateFinDelibere, 'yyyy-MM-dd') === '0001-01-01'){
           this.formulaire.controls.dateDelibere.setValue('');
           console.log(this.formulaire);
        }
        else{
          this.formulaire.controls.dateDelibere.setValue(s.dateFinDelibere);
        }




        this.formulaire.controls.dureeRestante.setValue(s.dureeRestante);
        this.formulaire.controls.priorite.setValue(s.priorite);
        this.formulaire.controls.statut.setValue(s.statut);

        this.facadeService.listeDecision = s;
        console.log('Liste de décision: ', this.facadeService.listeDecision);

        console.log('Signataires :' , this.formulaire.controls['redacteur' + 0]);
        console.log('S signataires' , s.signataires.length);
        // ajouté checkbox
        for (let i = 0; i < s.signataires.length; i++){
          console.log('Dans la boucle for');
          this.formulaire.controls['redacteur' + i].setValue(s.signataires[i].redacteur);
         }
/*
ajoutJuges(s: any){
  for (let i = 0; i < this.facadeService.listeDecision.signataires.length; i++) {
    this.formulaire.controls['nomJuge' + i].setValue( s.signataires[i].nomRessource);

    this.formulaire.controls['redacteur' + i].setValue(s.signataires[i].redacteur);
    this.formulaire.controls['ordreSignataire' + i].setValue(s.signataires[i].ordre);


*/


         // Remplir les valeurs de départ
        this.valDepDescription = this.facadeService.listeDecision.description;
        this.valDepDateDelibere = this.facadeService.listeDecision.dateFinDelibere;
        this.valDepPriorite = this.facadeService.listeDecision.priorite;



        console.log('Valeur du formulaire' , this.formulaire);
    });
    // this.facadeService.ObtenirInfosDecision(5)
    // .subscribe((r) => {
    //   console.log('Valeur du r' , r);
    //   this.facadeService.listeDecision  = r;
    //   console.log('Liste décisions services facade:' , this.facadeService.listeDecision);
    //  // console.log('liste decision [0]' , this.facadeService.listeDecision.toString().description);
    //   console.log('Valeur de départ:' , this.valDepDescription , this.valDepDateDelibere, this.valDepPriorite );
    //   // Assigner FormControl
    //   // this.formulaire.get('description').setValue(this.valDepDescription);
    //   // this.formulaire.get('dateDelibere').setValue(this.valDepDateDelibere);
    //   // this.formulaire.get('priorite').setValue(this.valDepPriorite);
    //   // this.formulaire.get('numero').setValue(this.facadeService.listeDecision[0].identifiant);
    //   // this.formulaire.get('importePar').setValue(this.facadeService.listeDecision[0].codeReseauDepot);
    //   this.spinner.hide();

    // });

   // console.log('Statut dans la liste de décision' , this.facadeService.listeDecision.statut);

 // TODO mail
    this.email = 'proulxguill@gmail.com';
    this.emailSubject = 'TNDM - rejet de décision';
    // TODO statut juge codé dur
    this.facadeService.indicateurJuge = false;
    this.couleurPrio = true;
  }

  validDate(control: FormControl): {[key: string]: any}|null
  {
  const dateVal = control.value;
  if (control && dateVal && !moment(dateVal, 'YYYY-MM-DD', true).isValid()) {
    return { dateVaidator: true };
  }
  return null;
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
    console.log('Numéro de la décsion sélectionné dans rejet:' , this.numDecSelectionner);
    console.log('Importé par:' , this.formulaire.controls.importePar.value);
    const donnees = {
      texte: 'Voulez-vous vraiment procéder au rejet de cette décision? IMPORTANT : Assurez-vous d’avoir une copie du document WORD avant de procéder au rejet puisque toutes les informations seront perdues. ',
      titre: 'Rejeté décision',
      texteBoutonOui: this.textesService.obtenirTexte('commun.oui'),
      texteBoutonNon: this.textesService.obtenirTexte('commun.non'),
      afficherBoutonOui: true,
      reponse: ''
    };
    const dialog = this.dialog.open(BoiteDialogueComponent, { width: '450px',
   data: donnees,
   ariaLabelledBy: 'titre-dialog',
   ariaDescribedBy: 'contenu-dialogue'});
    dialog.afterClosed().subscribe(() => {
      if (this.facadeService.reponseSuppressionFichier){
        console.log('SI suppresion décision');
        console.log('Numéro de la décsion sélectionné dans rejet dans le after close:' , this.numDecSelectionner);
        console.log('Importé par dans le after close:' , this.formulaire.controls.importePar.value);
        this.facadeService.rejetDecision(this.numDecSelectionner, this.formulaire.controls.importePar.value)
        .subscribe((s) => {
          console.log('Rejet de décision effectué avec success');
          this.router.navigateByUrl('/');
        },
        (erreur) => {console.log('Erreur lors du rejet de la décision'); }

        );
        this.dialog.closeAll();
      }
      else{
        this.dialog.closeAll();
      }
   });
    return dialog;
        // const donnees = {
        //   texte: 'Cette décision sera supprimée définitivement de TNDM',
        //   titre: 'Confirmation',
        //   texteBoutonOui: this.textesService.obtenirTexte('commun.oui'),
        //   texteBoutonNon: this.textesService.obtenirTexte('commun.non'),
        //   afficherBoutonOui: true,
        //   reponse: ''
        // };
        // return this.dialog.open(BoiteDialogueComponent, {
        //   width: '450px',
        //   data: donnees,
        //   ariaLabelledBy: 'titre-dialog',
        //   ariaDescribedBy: 'contenu-dialogue'
        // }).afterClosed().pipe(
        //   map(() => donnees.reponse === 'O')
        // );
  }
  voirDocumentWord(){
    console.log('Voir document word');
    const urlVouteWord = this.facadeService.listeDecision.urlDecisionWord;
    console.log('URL word:' , urlVouteWord);
    window.open(urlVouteWord);

  }
  voirDocumentPdf(){
    console.log('Voir document pdf');
    const urlVoute = this.facadeService.listeDecision.urlDecisionPDF;
    console.log('URL voute:' , urlVoute);

    window.open(urlVoute, '_blank' , 'height=' + screen.height + ',width=' + screen.width + ',resizable=yes,top=0,left=0');
    this.pdfClique = true;

  }
  demarrerSignature(){
    console.log('Démarrer la signature');

    this.spinner.show();
    this.facadeService.DemarrerSignature( this.numDecSelectionner, this.facadeService.listeAd.codeReseau)
    .subscribe((res) => {
      console.log('Valeur du résultat bool ' , res);
      this.spinner.hide();
      this.router.navigateByUrl('/');
     // this.toastr.success('Signature démarré avec succès , un courriel vous sera envoyé sous peu.', 'Message:');

    },
    (erreur) => {console.log('Erreur lors de démarrer la signature' , erreur) ;
                 this.toastr.error('Une erreur est survenue avec la signature.' , 'Erreur:');
  }
    );



    /**
      .subscribe((resR) => {
      this.facadeService.tableauDecision = resR;
      this.spinner.hide();
      console.log('Résultat recherche trié: ' , resR);
    },
    (err) => { console.log('Une erreur est survenue lors de l\'appel des données de la recherche') ,  this.spinner.hide()}
    );
    */
  }
  fermer(){
    console.log('Fermer');
    this.router.navigateByUrl('/');
  }
  afficheBouton(){
    this.boutonSauvegardeModif = true;
  }
  sauvegarderChangements(){
    console.log('Sauvegarder changement valeur du formulaire:' , this.formulaire);
    this.verifierSiChangements();
    console.log('Valeur description' , this.valDescription);
    console.log('Valeur date delibéré' , this.valDateDelibere);
    console.log('Valeur priorité' , this.valPriorite);
    this.facadeService.modifieInfoDecision(this.numDecSelectionner, this.valDescription,
       this.valDateDelibere, this.valPriorite, this.changementDate)
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
      if ( this.formulaire.get('description').value){
        this.valDescription =  this.formulaire.get('description').value;
      }
    }
    else{
      this.valDescription = '';
    }
    if (this.formulaire.get('dateDelibere').value !== this.valDepDateDelibere) {
      if (this.formulaire.get('dateDelibere').value === ''|| this.formulaire.get('dateDelibere').value === null){
        console.log('this.formulaire.get(dateDelibere).value !== this.valDepDateDelibere' , this.valDepDateDelibere);
        this.valDateDelibere = '0001-01-01';

      }
      else{
        this.valDateDelibere = this.retournerValeurDate(this.formulaire.get('dateDelibere').value);
        console.log('Dans le else retourner valeur: ' , this.valDateDelibere);
      }
      this.changementDate = true;
     }
     else{
      this.valDateDelibere = '0001-01-01';
      this.changementDate = false;
    }
    if (this.formulaire.get('priorite').value !== this.valDepPriorite){

      console.log('Dans priorité pas égal valeur départ');
      this.valPriorite = this.formulaire.get('priorite').value;
     }
     else{
      this.valPriorite = '';
    }
  }
}


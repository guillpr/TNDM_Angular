import { Signataires } from './../entitees/signataires';
import { Component, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BoiteDialogueComponent } from '../commun/boite-dialogue.component';
import { CanComponentDeactivate } from '../commun/can-deactivate.guard';
import { FacadeService } from '../services/facade.service';
import { TextesService } from '../services/textes.service';
import { map } from 'rxjs/operators';
import { FichierJoint } from '../entitees/fichier-joint';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Decision } from '../entitees/decision';
import moment from 'moment';

const ordreDejaPris: ValidatorFn = (valeur: AbstractControl) => {

  if (Number(valeur.get('ordreSignataire0').value) === Number(valeur.get('ordreSignataire1').value)
  || Number(valeur.get('ordreSignataire0').value) === Number(valeur.get('ordreSignataire2').value)
  || Number(valeur.get('ordreSignataire0').value) === Number(valeur.get('ordreSignataire3').value)
  || Number(valeur.get('ordreSignataire0').value) === Number(valeur.get('ordreSignataire4').value)){
    console.log('Dans la premiere condition');
    return { erreurOrdre: true };
  }
  if (valeur.get('ordreSignataire1').value && (Number(valeur.get('ordreSignataire1').value) === Number(valeur.get('ordreSignataire2').value)
  || Number(valeur.get('ordreSignataire1').value) === Number(valeur.get('ordreSignataire3').value)
  || Number(valeur.get('ordreSignataire1').value) === Number(valeur.get('ordreSignataire4').value))){
    console.log('Dans la deuxieme condition');
    return { erreurOrdre: true };
  }
  if (valeur.get('ordreSignataire2').value &&
    (Number(valeur.get('ordreSignataire2').value) === Number(valeur.get('ordreSignataire3').value)
  || Number(valeur.get('ordreSignataire2').value) === Number(valeur.get('ordreSignataire4').value))){
    console.log('Dans la troisieme condition');
    return { erreurOrdre: true };
  }
  if (valeur.get('ordreSignataire3').value &&
  (Number(valeur.get('ordreSignataire3').value) === Number(valeur.get('ordreSignataire4').value))){
  console.log('Dans la quatrième condition');
  return { erreurOrdre: true };
}
  return null;
};

const validDatePlusUnAn: ValidatorFn = (ctrl: AbstractControl) => {
const dateMomentConv = moment(ctrl.get('dateDelibere').value).format('YYYY-MM-DD');
const dateDuJour = new Date();
const momentNewDate = new Date(dateMomentConv);
const diffDate = momentNewDate.getTime() - dateDuJour.getTime();



const diffEnJour = diffDate / (1000 * 3600 * 24);
if (diffEnJour > 365) {
    return { erreurDatePlusUnAn: true };
  }
if (diffEnJour < -731) {
    return { erreurDateMoinsDeuxAn: true };
  }
return null;
};



@Component({
  selector: 'app-import-decision',
  templateUrl: './import-decision.component.html',
  styleUrls: ['./import-decision.component.css']
})
export class ImportDecisionComponent implements OnInit {

  @ViewChild('fileDropRef') fileInput: any;


  public formulaire: FormGroup;

  listeSignataire: number[]  = [];

  myComponents: any[] = [];
  // Conditions
  compteur = 0;
  messageErreurExtension = false;
  buttonDisabled = true;
  headers = '';
  messageErreurImport = false;
  messageSuppression = false;

  erreurOrdre = false;



  // Fichiers
  files: any[] = [];
  fichiers: FichierJoint[] = [];

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

  constructor(private fb: FormBuilder,
              public textesService: TextesService,
              public facadeService: FacadeService,
              public dialog: MatDialog,
              public router: Router,
              private spinner: NgxSpinnerService,
              public datepipe: DatePipe) { }




  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> {
    return of(true);
  }
  ngOnInit(): void {
    this.facadeService.listeDecisionImp = undefined;
    this.initialiserFormulaire();
    this.facadeService.reponseSuppressionFichier = false;
  }
  validDate(control: FormControl): {[key: string]: any}|null
  {
  const dateVal = control.value;
  const dateDuJour = new Date();
  console.log(dateVal);
  console.log(control);

  if (dateVal){
    console.log('Dans dateVal');
    const dateMomentAConvertir = new Date(dateVal);
    console.log(dateMomentAConvertir);
  }
  if (Number(dateVal) - Number(new Date()) > 365){
   console.log('Plus grand que 365' , Number(new Date()));
  }
  if (control && dateVal && !moment(dateVal, 'YYYY-MM-DD', true).isValid()) {
    return { dateVaidator: true };
  }
  return null;
}


   initialiserFormulaire(){
// tslint:disable-next-line: deprecation
    this.formulaire = this.fb.group({
      description: ['', [Validators.required]],
      dateDelibere:  ['' , this.validDate ],
      priorite: new FormControl('Normale'),
      nomJuge0: new FormControl({value: '', disabled: true}),
      nomJuge1: new FormControl({value: '', disabled: true}),
      nomJuge2: new FormControl({value: '', disabled: true}),
      nomJuge3: new FormControl({value: '', disabled: true}),
      nomJuge4: new FormControl({value: '', disabled: true}),
      ordreSignataire0: new FormControl(''),
      ordreSignataire1: new FormControl(''),
      ordreSignataire2: new FormControl(''),
      ordreSignataire3: new FormControl(''),
      ordreSignataire4: new FormControl(''),
      redacteur0: new FormControl({value: '', disabled: true}),
      redacteur1: new FormControl({value: '', disabled: true}),
      redacteur2: new FormControl({value: '', disabled: true}),
      redacteur3: new FormControl({value: '', disabled: true}),
      redacteur4: new FormControl({value: '', disabled: true}),
      nomFichier: new FormControl('')
    }, { validator: [ validDatePlusUnAn, ordreDejaPris]});
   }
  get f() {
    return this.formulaire.controls;
  }
  public remplirChampsModifie(){
    if (this.formulaire.get('description').value){
      this.facadeService.listeDecisionImp.description = this.formulaire.get('description').value;
    }
    if (this.formulaire.get('dateDelibere').value){
      this.facadeService.listeDecisionImp.dateFinDelibere = this.formulaire.get('dateDelibere').value;
    }
    else{
      this.facadeService.listeDecisionImp.dateFinDelibere = new Date('0001-01-01');
    }
    if (this.formulaire.get('priorite').value){
      this.facadeService.listeDecisionImp.priorite = this.formulaire.get('priorite').value;
    }
    for (let i = 0; i < this.facadeService.listeDecisionImp.signataires.length; i++) {
      this.facadeService.listeDecisionImp.signataires[i].ordre = Number(this.formulaire.controls['ordreSignataire' + i].value);
    }
  }

  public importerDecision(){
    if (this.formulaire.valid){
      this.remplirChampsModifie();
      this.spinner.show();
      this.facadeService.ImporterDecision(this.facadeService.listeDecisionImp)
       .subscribe((r) => {
         console.log('Valeur du résultat de importer décision' , r);
         this.spinner.hide();
       },
       (erreur) => {console.log('Erreur' , erreur);
                    this.spinner.hide();
      }
       );
      this.router.navigateByUrl('/');
    }

   // this.router.navigateByUrl('/juge');
  }

  messageErreurQuitter(){
    const donnees = {
      texte: 'Vous êtes sur le point de retourner à l’écran d’accueil. Une décision est en cours d’importation, toutes les informations seront perdues. ',
      titre: '',
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
        console.log('SI suppresion fichier dans quitter');
        this.methodeSuppressionFichier();
        this.dialog.closeAll();
        this.router.navigateByUrl('/');
      }
      else{
        this.dialog.closeAll();
      }
   });
    return dialog;
  }

  public quitterDecision(){
    if (this.facadeService.listeDecisionImp){
      this.messageErreurQuitter();
  }
  else{
    this.router.navigateByUrl('/');
  }
}
  // Méthode pour Fichiers
  suppressionFichier(){
    this.messageSuppression = true;

    this.messageErreurFichier2();
  }

methodeSuppressionFichier(){
  this.formulaire.get('nomFichier').setValue('');
  this.fichiers.shift();
  this.facadeService.listeDecisionImp = undefined;
  this.buttonDisabled = true;
}

messageErreurFichier2(){
  const donnees = {
    texte: 'Voulez-vous vraiment procéder à l’importation d’une nouvelle décision? Toutes les informations seront perdues.',
    titre: '',
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
      console.log('SI suppresion fichier');
      this.methodeSuppressionFichier();
      this.formulaire.reset();
      this.dialog.closeAll();
    }
    else{
      this.dialog.closeAll();
    }
 });
  return dialog;
}

  messageErreurFichier(): Observable<boolean>{
    if ( this.messageSuppression){

      const donnees = {
        texte: 'Voulez-vous vraiment supprimer le fichier?',
        titre: 'Suppression de fichier',
        texteBoutonOui: this.textesService.obtenirTexte('commun.oui'),
        texteBoutonNon: this.textesService.obtenirTexte('commun.non'),
        afficherBoutonOui: true,
        reponse: ''

      };
      return  this.dialog.open(BoiteDialogueComponent, {
        width: '450px',
        data: donnees,
        ariaLabelledBy: 'titre-dialog',
        ariaDescribedBy: 'contenu-dialogue'
      }).afterClosed().pipe(
        map(() =>
        this.facadeService.reponseSuppressionFichier = true,
        donnees.reponse === 'O')
      );
      }
    return of(true);

  }
  onFileDropped($event: any){
    console.log('On file droped');
    this.gererFichiers((event as DragEvent).dataTransfer.files);
 }
 fileBrowseHandler(files: any){
  this.gererFichiers(files);
  this.fileInput.nativeElement.value = '';
 }
 gererFichier(file: any) {

  this.headers = file.type;
  const ext = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
  if (ext === 'doc' || ext === 'docx')
 {
  const reader = new FileReader();
  let f: FichierJoint;
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    f =
    {
      decisionWord:  reader.result.toString().replace(this.headers , '').replace('data:;base64,', ''),
      codeReseauDepot: this.facadeService.listeAd.codeReseau,
      nomDocumentDecision: file.name,
    };
    this.spinner.show();
    this.facadeService.ObtenirInfoDocument(f)
    .subscribe((s) => {
        console.log('Valeur du resultat' , s);
        this.fichiers.push(f);

        this.facadeService.listeDecisionImp = s;
        console.log('Valeur du S après assignation facade:' , s);
        console.log('Valeur liste décision facade' , this.facadeService.listeDecisionImp);
        this.buttonDisabled = false;
        this.formulaire.controls.description.setValue(s.description);
        this.messageErreurImport = false;
        this.spinner.hide();

        if ( s.signataires != null)
         {
           console.log('Ajout de juge');
           this.ajoutJuges(s);

         }
    },
    err => {console.log('Erreur importation' , err);
            this.spinner.hide();
            this.messageErreurImport = true;
  }
    );
    this.messageErreurExtension = false;
  };
  console.log(f);
}
else{
  this.messageErreurExtension = true;
}
  console.log(this.fichiers);
}
gererFichiers(files: any) {
  const fichiers = Array.from(files);
  fichiers.forEach(element => {
    this.gererFichier(element);
  });
}
 // Fin de méthode pour fichiers
 ajoutJuges(s: any){
  for (let i = 0; i < this.facadeService.listeDecisionImp.signataires.length; i++) {
    this.formulaire.controls['nomJuge' + i].setValue( s.signataires[i].nomRessource);
    this.formulaire.controls['redacteur' + i].setValue(s.signataires[i].redacteur);
    this.formulaire.controls['ordreSignataire' + i].setValue(s.signataires[i].ordre);
    console.log(this.formulaire);
  }
 }
  onSubmit(){
    console.log(this.formulaire);
  }
}

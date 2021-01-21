import { Signataires } from './../entitees/signataires';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

@Component({
  selector: 'app-import-decision',
  templateUrl: './import-decision.component.html',
  styleUrls: ['./import-decision.component.css']
})
export class ImportDecisionComponent implements OnInit {

  @ViewChild('fileDropRef') fileInput: any;

  public formulaire: FormGroup;


  myComponents: any[] = [];
  // Conditions
  compteur = 0;
  messageErreurExtension = false;
  buttonDisabled = true;
  headers = '';
  messageErreurImport = false;

  // Fichiers
  files: any[] = [];
  fichiers: FichierJoint[] = [];

  constructor(private fb: FormBuilder,
              public textesService: TextesService,
              public facadeService: FacadeService,
              public dialog: MatDialog,
              public router: Router,
              private spinner: NgxSpinnerService) { }


  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> {
    if (nextState.url !== '/juge') {
      const donnees = {
        texte: this.textesService.obtenirTexte('commun.descriptionPerteDonnees'),
        titre: this.textesService.obtenirTexte('commun.titrePerteDonnees'),
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
    return of(true);
  }
  ngOnInit(): void {
    this.initialiserFormulaire();
    // if(!this.facadeService.listeAd){
    //   this.facadeService.obtenirCodeUsagerAD()
    //   .subscribe((s) => {
    //     this.facadeService.listeAd = s;
    //   });


      // .subscribe((s) => {
      //   console.log('Valeur du resultat' , s);
      //   this.fichiers.push(f);
      //   this.facadeService.retourDecision = s;
      //   this.buttonDisabled = false;
      //   this.formulaire.controls.description.setValue(s.description);
      //   this.messageErreurImport = false;
      //   this.spinner.hide();





 //  }
  }

   initialiserFormulaire(){
    this.formulaire = this.fb.group({
      description: new FormControl(''),
      dateDelibere: new FormControl(''),
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
    });
   }


  get f() {
    return this.formulaire.controls;
  }


  public ajouterJuge(){
    console.log('adding');
    const valeur = 'valeur';
    this.compteur++;
    const newValeur = valeur + this.compteur;
    console.log(newValeur);
    this.myComponents.push(newValeur);

  }
  public supprimerJuge(){
    this.compteur--;
    this.myComponents.splice(-1);
  }
  public importerDecision(){
    alert('Décision Importée');
   // this.router.navigateByUrl('/juge');
  }
  public quitterDecision(){
    this.router.navigateByUrl('/');
  }
  // Méthode pour Fichiers
  suppressionFichier(){

    console.log('Avant suppression' , this.fichiers);
    this.formulaire.get('nomFichier').setValue('');
    this.fichiers.shift();
    this.facadeService.retourDecision = undefined;
    this.buttonDisabled = true;
    console.log('Apres suppression' , this.fichiers);
    console.log('Retour décision: ' , this.facadeService.retourDecision);
  }
  suppressionJuge(index: number){
    console.log('Index: ' ,index);
    console.log('Valeur signataire' , this.facadeService.retourDecision.signataires);
    this.facadeService.retourDecision.signataires.splice(index, 1);
    this.formulaire.controls['nomJuge' + index].setValue('');
    if ( this.facadeService.retourDecision.signataires.length < 1 ){
      this.suppressionFichier();
    }
    console.log(this.formulaire);
  }
  onFileDropped($event: any){
    console.log('Le fichier' , this.fichiers);
    console.log(this.fichiers.length);
    this.gererFichiers((event as DragEvent).dataTransfer.files);
 }
 fileBrowseHandler(files: any){
  console.log('Le fichier' , files);
  this.gererFichiers(files);
  this.fileInput.nativeElement.value = '';
 }
 gererFichier(file: any) {

  this.headers = file.type;
  const ext = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
  console.log('Extension:');
  console.log(ext);

  if (ext === 'doc' || ext === 'docx')
 {
  const reader = new FileReader();
  let f: FichierJoint;
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    f =
    {
      decisionWord:  reader.result.toString().replace(this.headers , '').replace('data:;base64,', ''),
      codeReseauDepot: this.facadeService.listeAd.codeUtilisateurAD,
      nomDocumentDecision: file.name,
    };
    console.log('reader' ,f);
    console.log(this.formulaire.get('nomFichier'));
    console.log('formulaire: ' ,  this.formulaire);
    console.log('Retour décision avant: ' , this.facadeService.retourDecision);
    this.spinner.show();
    this.facadeService.ObtenirInfoDocument(f)
    .subscribe((s) => {
        console.log('Valeur du resultat' , s);
        this.fichiers.push(f);
        this.facadeService.retourDecision = s;
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
  for (let i = 0; i < this.facadeService.retourDecision.signataires.length; i++) {
    this.formulaire.controls['nomJuge' + i].setValue( s.signataires[i].juge);

    this.formulaire.controls['redacteur' + i].setValue(s.signataires[i].redacteur);
    this.formulaire.controls['ordreSignataire' + i].setValue(s.signataires[i].ordre);

    // if(s.signataires[i].ordre === 1) {
    //  this.formulaire.controls['redacteur' + i].setValue(true);
    //  this.formulaire.controls['ordreSignataire' + i].setValue(true);
    // }
    // else{
    //   this.formulaire.controls['redacteur' + i].setValue(false);
    // }
    //this.formulaire.controls['redacteur' + i].setValue(true);
    console.log(this.formulaire);
  }
 }
  onSubmit(){
    console.log(this.formulaire);
  }
}

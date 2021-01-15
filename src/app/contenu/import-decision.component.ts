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

  // Fichiers
  files: any[] = [];
  fichiers: FichierJoint[] = [];

  constructor(private fb: FormBuilder,
              public textesService: TextesService,
              public facadeService: FacadeService,
              public dialog: MatDialog,
              public router: Router) { }


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




   }

   initialiserFormulaire(){
    this.formulaire = this.fb.group({
      description: new FormControl(''),
      dateDelibere: new FormControl(''),
      nomJuge0: new FormControl(''),
      nomJuge1: new FormControl(''),
      nomJuge2: new FormControl(''),
      nomJuge3: new FormControl(''),
      nomJuge4: new FormControl(''),
      ordreSignataire0: new FormControl(''),
      ordreSignataire1: new FormControl(''),
      ordreSignataire2: new FormControl(''),
      ordreSignataire3: new FormControl(''),
      ordreSignataire4: new FormControl(''),
      redacteur0: new FormControl(''),
      redacteur1: new FormControl(''),
      redacteur2: new FormControl(''),
      redacteur3: new FormControl(''),
      redacteur4: new FormControl(''),
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
    console.log(index);
    this.facadeService.retourDecision.juges.splice(index, 1);
    this.formulaire.controls['nomJuge' + index].setValue('');
    if ( this.facadeService.retourDecision.juges.length < 1 ){
      this.suppressionFichier();
    }
    console.log(this.formulaire);
  }
  onFileDropped($event: any){
    console.log(this.fichiers);
    console.log(this.fichiers.length);
    this.gererFichiers((event as DragEvent).dataTransfer.files);
 }
 fileBrowseHandler(files: any){

   this.gererFichiers(files);
   // this.fileInput.nativeElement.value = '';
 }
 gererFichier(file: any) {

  const ext = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
  console.log('Extension:');
  console.log(ext);

  if (ext === 'doc' || ext === 'docx')
 {


  const reader = new FileReader();
  let f: FichierJoint;


  // this.getBase64(file).then(
  //   data => console.log(data)
  // );

  reader.readAsDataURL(file);
  reader.onload = (e) => {

    f =
    {
      decisionWord:  reader.result.toString().replace('data:application/msword;base64,' , ''),
      codeReseauDepot: 'PROUGUIL0001',
      nomDocumentDecision: file.name,
    };

    console.log('reader' ,f);

    console.log(this.formulaire.get('nomFichier'));
    console.log('formulaire: ' ,  this.formulaire);
    this.fichiers.push(f);
    console.log('Retour décision avant: ' , this.facadeService.retourDecision);
    this.facadeService.ObtenirInfoDocument(f)
    .subscribe((s) => {
      if(s != null){
        console.log(s);
        this.facadeService.retourDecision = s;
        this.buttonDisabled = false;
        this.formulaire.controls.description.setValue(s.description);
        this.ajoutJuges(s);
      }
    });
    // this.facadeService.TeleverserDocument(f)
    //  .subscribe((s) => {
    //    console.log(s);
    //  });
    this.messageErreurExtension = false;
    // console.log('Contenu du fichier' , this.fichiers[0].contenu);
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
  for (let i = 0; i < this.facadeService.retourDecision.juges.length; i++) {


    this.formulaire.controls['nomJuge' + i].setValue(s.juges[i]);
    console.log(this.formulaire);
  }

 }

  onSubmit(){
    console.log(this.formulaire);
  }

}

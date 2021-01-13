import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BoiteDialogueComponent } from '../commun/boite-dialogue.component';
import { CanComponentDeactivate } from '../commun/can-deactivate.guard';
import { FacadeService } from '../services/facade.service';
import { TextesService } from '../services/textes.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-import-decision',
  templateUrl: './import-decision.component.html',
  styleUrls: ['./import-decision.component.css']
})
export class ImportDecisionComponent implements OnInit {

  public formulaire: FormGroup;


  myComponents: any[] = [];
  compteur = 0;

  constructor(private fb: FormBuilder,
              public textesService: TextesService,
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
      nomJuge: new FormControl(''),
      ordreSignataire: new FormControl(''),
      redacteur: new FormControl(''),
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
    this.router.navigateByUrl('/juge');
  }
  public quitterDecision(){
    this.router.navigateByUrl('/');
  }
  onSubmit(){
    console.log(this.formulaire);
  }

}

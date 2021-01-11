import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnyARecord } from 'dns';
import { map } from 'rxjs/operators';
import { BoiteDialogueComponent } from '../commun/boite-dialogue.component';
import { FacadeService } from '../services/facade.service';
import { TextesService } from '../services/textes.service';

@Component({
  selector: 'app-info-decision-adjointe',
  templateUrl: './info-decision-adjointe.component.html',
  styleUrls: ['./info-decision-adjointe.component.css']
})
export class InfoDecisionAdjointeComponent implements OnInit {
  numDecSelectionner: string;

  boiteDecisionOuverte = true;
  boiteDossAss = true;
  boiteSignature = true;
  boiteHistorique = true;
  prioSelected = '';
  couleurPrio = false;

  isEnabled = true;

  // Mail
  email: string;
  emailSubject: string;

  constructor(public facadeService: FacadeService,
              public dialog: MatDialog,
              public textesService: TextesService) { }

  ngOnInit(): void {
 // TODO mail
  this.email = 'proulxguill@gmail.com';
  this.emailSubject = 'TNDM - rejet de décision';
    // TODO statut juge codé dur
  this.facadeService.indicateurJuge = true;
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
    this.prioSelected = event.target.value;
    const valeurPrio = event.target.value;
    if(valeurPrio === '1'){
      this.couleurPrio = true;
    }
    else{
      this.couleurPrio = false;
    }
    console.log(event);
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
    console.log('dans édition description');

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

}

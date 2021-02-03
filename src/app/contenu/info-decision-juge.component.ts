import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { BoiteDialogueComponent } from '../commun/boite-dialogue.component';
import { FacadeService } from '../services/facade.service';
import { TextesService } from '../services/textes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-decision-juge',
  templateUrl: './info-decision-juge.component.html',
  styleUrls: ['./info-decision-juge.component.css']
})
export class InfoDecisionJugeComponent implements OnInit {

  numDecSelectionner: number;

  boiteDecisionOuverte = false;
  boiteDossAss = false;
  boiteSignature = false;
  boiteHistorique = false;
  prioSelected = '';
  couleurPrio = false;

  constructor(public facadeService: FacadeService,
              public dialog: MatDialog,
              public router: Router,
              public textesService: TextesService) { }

  ngOnInit(): void {
    this.couleurPrio = true;
    this.numDecSelectionner = this.facadeService.numDecisionTemp;

    if(this.numDecSelectionner === undefined){
      this.router.navigateByUrl('/');
    }

    this.facadeService.ObtenirInfosDecision(this.numDecSelectionner)
    .subscribe((s) => {
      this.facadeService.listeDecision = s;
    });

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
  }
  fermerPage(){
    this.router.navigateByUrl('/');
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

}

import { Component, OnInit } from '@angular/core';
import { AnyARecord } from 'dns';
import { FacadeService } from '../services/facade.service';

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

  constructor(public facadeService: FacadeService) { }

  ngOnInit(): void {
    this.numDecSelectionner = this.facadeService.numDecisionTemp;
    const ddValue: HTMLElement = document.querySelector(
      '#inputGroupSelectPrio'
  ).nodeValue;
    
    console.log(ddValue);

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

}

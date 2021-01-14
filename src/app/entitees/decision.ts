import { Injectable } from '@angular/core';
import { EPriorite } from './enums/priorite';

@Injectable()
export class Decision{
      public codeReseauDepot: string;
      public nomDocumentDecision: string;
      public identifiant: string;
      public erreur: string;
      public codeReseauJuges: [];
      public juges: [];
      public dateDelibere: Date;
      public description: string;
      public noDossierTaq: [];
      public section: string;
      public indentifiantWord: string;

    // public decisionId!: number;
    // public numeroDecision!: string;
    // public numeroDossier!: string;
    // public nbDossier!: number;
    // public dateImportation!: string;
    // public dateFinDelibere!: string;
    // public description!: string;
    // public juge!: string;
    // public priorite!: number;
    // public statut!: number;
    // public indSignature!: number;
    // public durRestante!: string;

    constructor() {
    }
}

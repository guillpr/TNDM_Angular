import { Signataires } from './signataires';
import { DossierTAQ } from './dossierTaq';
import { Injectable } from '@angular/core';
import { EPriorite } from './enums/priorite';
import { HistoriqueStatut } from './historiqueStatut';

export class Decision{
     public iDDocument: number;
     public identifiant: string;
     public identifiantWord: string;
     public codeReseauDepot: number;
     public nomRessourceDepot: string;
     public nomDocumentDecision: string;
     public dateImportation: Date;
     public dateFinDelibere: Date;
     public dureeRestante: number;
     public description: string;
     public section: string;
     public  dossiersTAQ: DossierTAQ[];
     public signataires: Signataires[];
     public codeReseauSignataire: string;
     public identifiantStatut: number;
     public statut: string;
     public priorite: string;
     public erreur: string;
     public uRLDecisionWord: string;
     public uRLDecisionPDF: string;
     public uRLVoute: string;
     public uRLDecisionPDFFinale: string;
     public historiqueStatuts: HistoriqueStatut[];








    constructor() {
    }
}

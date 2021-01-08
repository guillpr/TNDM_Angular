import { Injectable } from '@angular/core';
import { EPriorite } from './enums/priorite';

@Injectable()
export class Decision{
    public decisionId!: number;
    public numeroDecision!: string;
    public numeroDossier!: string;
    public nbDossier!: number;
    public dateImportation!: string;
    public dateFinDelibere!: string;
    public description!: string;
    public juge!: string;
    public priorite!: EPriorite;
    public statut!: number;
    public indSignature!: number;
    public durRestante!: string;

    constructor() {
    }
}

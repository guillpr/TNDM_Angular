import { DossierTAQ } from './dossierTaq';
import { Signataires } from './signataires';
export class RetourDecision {
  public idDecision: number;
  public identifiant: string;
  public indentifiantWord: string;
  public codeReseauDepot: string;
  public nomDocumentDecision: string;
  public dateImportation: Date;
  public dateDelibere: Date;
  public dureeRestante: number;
  public description: string;
  public section: string;
  public dossierTaq: DossierTAQ[];
  public signataires: Signataires[];
  public signataireCodeReseau: []
  public statut: string;
  public priorite: string;
  public erreur: string;
  public urlDecisionWord: string;
  public urlDecisionPdf: string;
  public urlVoute: string;
  public urlDecisionPdfFinale: string;

  public codeReseauJuges: [];
  public juges: [];





}



export class Recherche{
  public status: number[];
  public adjointesJuges: string;
  public section: string;
  public numero: string;
  public noDossierTAQ: number;
  public dateDebutImportation: Date;
  public dateFinImportation: Date;
  public priorite: string;
  // Tri de recherche  :
        // 0 = défaut,
        // 1 = Date importation croissant
        // 2 = Date importation décroissant
        // 3 = Date de fin de délibéré croissant
        // 4 = Date de fin de délibéré décroissant
        // 5 = Durée restant croissant
        // 6 = Durée restant décroissant
        // 7 = Priorité (normale en premier)
        // 8 = Priorité (urgente en premier)
  public triRecherche: number;
   // Profil (1 = adjointes, 2 = juges)
   public profil: number;
   public codeReseauDemandeur: string;

 constructor() {
 }
}

import { JugesAdjointes } from './../entitees/jugesAdjointes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Decision } from '../entitees/decision';
import { FichierJoint } from '../entitees/fichier-joint';
import { Juge } from '../entitees/juge';
import { RetourDecision } from '../entitees/RetourDecision';
import { ReponseBase } from './reponseBase';
import { Usager } from '../entitees/usager';
import { Recherche } from '../entitees/recherche';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {


  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  numDecisionTemp: number;
  indicateurJuge: boolean;
  reponseSuppressionFichier = false;

  // Liste ou object
  public listJuge: Juge[];
  public tableauDecision: Decision[];
  public retourDecision: RetourDecision;
  public recherche: Recherche;
  public listeDecision: Decision;
  // Liste décision pour importation
  public listeDecisionImp: Decision;
  public listeAd: Usager;
  public listeJugesAdjointes: JugesAdjointes[];
  public body = { title: 'Angular PUT Request Example' };






  // Url controller
  //private DecisionURL = environment.apiBaseUrl + 'DecisionDetail';
 // private DecisionRecherche = environment.apiBaseUrl + 'DecisionDetail/Requete/';
  //private JugeUrl = environment.apiBaseUrl + 'JugeDetail';
 // private NoDecisionUrl = environment.apiBaseUrl + 'DecisionDetail/NoDecision';
 // private obtenirInfoDocumentUrl = environment.apiBaseUrlSignature + 'v1/Decision/Info';

  private usagerWindowsUrl = environment.apiBaseUrlFacade + 'v1/Decision//api/Decision/Ad';

// Facade
  private FacadeUrlAd = environment.apiBaseUrlFacade + 'v1/Decision/Ad';
  private obtenirInfoDocumentUrlFacade = environment.apiBaseUrlFacade + 'v1/Decision/Info';
  private modifDecisionUrlFacade = environment.apiBaseUrlFacade + 'v1/Decision/ModifDecision';

  private jugesAdjointesURL = environment.apiBaseUrlFacade + 'v1/Decision/JugesAdjointe';

  private obtenirInfosDecisionURL = environment.apiBaseUrlFacade + 'v1/Decision/InfosDecision';

  private obtenirRechercheDecisionURL = environment.apiBaseUrlFacade + 'v1/Decision/Recherche';

  private obtenirRechercheDecisionTrieURL = environment.apiBaseUrlFacade + 'v1/Decision/Recherche2';

  // Decision GET et POST
  private DecisionURL = environment.apiBaseUrlFacade + 'v1/Decision';

  private demarrerSignatureURL = environment.apiBaseUrlFacade + 'v1/Decision/DemarrerSignature';






    //private usagerAdURL = environment.apiBaseUrlDossier + 'v1/Ressource/Ad';

  private URL = 'http://localhost:57759/api/DecisionDetail';
  public httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache, must-revalidate , post-check=0, pre-check=0',
      'Content-Type': 'application/json',
      Pragma: 'no-cache',
        Expires: '0'
  }),
  };

  // // public ObtenirDecision():Observable<ReponseBase<Decision>>{
  // //   return this.http.get<ReponseBase<Decision>>(this.obtenirDecision);
  // // }

  // Méthode GET
  // TODO
  // public obtenirDecisionList(): Observable<Decision[]>{
  //  return this.http.get<Decision[]>(this.DecisionURL);
  // }
  // public obtenirJuges(): Observable<Juge[]>{
  //   return this.http.get<Juge[]>(this.JugeUrl);
  // }
  // Obtenir Code Usager du service de facade
  public obtenirCodeUsagerAD(): Observable<Usager>{
    console.log('dans obtenir code usager ad service de facade front-end');
    return this.http.get<Usager>(this.FacadeUrlAd);
  }
 //   Obtenir Juges du service facade
 public ObtenirJugesAdjointes(codeUtil: string): Observable<JugesAdjointes[]>{
  return this.http.get<JugesAdjointes[]>(this.jugesAdjointesURL + '?CodeReseau=' + codeUtil );
}
// Obtenir informations d'un décision par ID
public ObtenirInfosDecision(idDocument: number): Observable<Decision>{
  return this.http.get<Decision>(this.obtenirInfosDecisionURL + '?idDocument=' + idDocument, this.httpOptions );
}
public ObtenirRechercheDecision(): Observable<Decision[]>{
  return this.http.get<Decision[]>(this.obtenirRechercheDecisionURL);
}
public obtenirDecisionListTrie(recherche: Recherche): Observable<Decision[]>{

  return this.http.post<Decision[]>(this.obtenirRechercheDecisionTrieURL, JSON.stringify(recherche), this.httpOptions );
}
public DemarrerSignature(idDocument: number, codeReseau: string){
  return this.http.get(this.demarrerSignatureURL + '?idDocument=' + idDocument + '&CodeReseau=' + codeReseau);
}
  // public ObtenirJugesAdjointes(codeUtil: string): Observable<JugesAdjointes[]>{
  //   return this.http.get<JugesAdjointes[]>(this.jugesAdjointesURL + '?CodeReseau=' + codeUtil );
  // }
  // Méthode POST

  // Obtenir InfoDécision du service de facade
  public ObtenirInfoDocument(fichier: FichierJoint): Observable<Decision>{
       return this.http.post<Decision>(this.obtenirInfoDocumentUrlFacade, JSON.stringify(fichier), this.httpOptions);
     }

//  public TeleverserDocument(fichier: FichierJoint): Observable<RetourDecision[]>{
//    return this.http.post<RetourDecision[]>(this.NoDecisionUrl, JSON.stringify(fichier),  this.httpOptions);
//  }
 public ImporterDecision(decision: Decision): Observable<Decision>{
   console.log('JSON decision:' , JSON.stringify(decision));
   return this.http.post<Decision>(this.DecisionURL, JSON.stringify(decision), this.httpOptions);
 }

 // Méthode PUT
 public modifieInfoDecision(idDecision: number, description: string,
                            date: string, priorite: string, changementDate: boolean): Observable<boolean>{
console.log('Date: ' , date);
return this.http.put<boolean>(this.modifDecisionUrlFacade + '?idDocument=' + idDecision
    + '&Description=' + description + '&DateFinDelibere=' + date + '&Priorite=' + priorite +
     '&ChangementDate=' + changementDate, this.body);
 }

 // Méthode DELETE
 public rejetDecision(idDocument: number, codeReseau: string){
   console.log('Valeur de idDocument service de facade avant delete' , idDocument);
   console.log('Valeur du code réseau service de facade avant delete' , codeReseau);
   return this.http.delete(this.DecisionURL + '?idDocument=' + idDocument + '&CodeReseau=' + codeReseau );
 }

  // public obtenirDecisionListRecherche(requete: string){
  //   return this.http.get(this.DecisionRecherche + requete)
  //    .toPromise()
  //    .then(res => this.list = res as Decision[]);
  //  }

  //  public obtenirJuges(){
  //   return this.http.get(this.JugeUrl)
  //    .toPromise()
  //    .then(res => this.listJuge = res as Juge[]);
  //  }
}

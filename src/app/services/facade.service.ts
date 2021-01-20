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

@Injectable({
  providedIn: 'root'
})
export class FacadeService {


  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  numDecisionTemp: string;
  indicateurJuge: boolean;

  // Liste ou object
  public listJuge: Juge[];
  public retourDecision: RetourDecision;
  public listeDecisions: Decision[];
  public listeAd: Usager;
  public listeJugesAdjointes: JugesAdjointes[];





  // Url controller
  private DecisionURL = environment.apiBaseUrl + 'DecisionDetail';
  private DecisionRecherche = environment.apiBaseUrl + 'DecisionDetail/Requete/';
  private JugeUrl = environment.apiBaseUrl + 'JugeDetail';
  private NoDecisionUrl = environment.apiBaseUrl + 'DecisionDetail/NoDecision';
  private obtenirInfoDocumentUrl = environment.apiBaseUrlSignature + 'v1/Decision/Info';
  private usagerAdURL = environment.apiBaseUrlDossier + 'v1/Ressource/Ad';
  private jugesAdjointesURL = environment.apiBaseUrlDossier + 'v1/Ressource/JugesAdjointe';

  private URL = 'http://localhost:57759/api/DecisionDetail';
  formData: Decision = new Decision();
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // // public ObtenirDecision():Observable<ReponseBase<Decision>>{
  // //   return this.http.get<ReponseBase<Decision>>(this.obtenirDecision);
  // // }
  // Méthode GET
  public obtenirDecisionList(): Observable<Decision[]>{
   return this.http.get<Decision[]>(this.DecisionURL);
  }
  public obtenirJuges(): Observable<Juge[]>{
    return this.http.get<Juge[]>(this.JugeUrl);
  }
  public obtenirCodeUsagerAD(): Observable<Usager>{
    return this.http.get<Usager>(this.usagerAdURL);
  }
  public ObtenirJugesAdjointes(codeUtil: string): Observable<JugesAdjointes[]>{
    return this.http.get<JugesAdjointes[]>(this.jugesAdjointesURL + '?CodeReseau=' + codeUtil );
  }
  // Méthode POST
  public ObtenirInfoDocument(fichier: FichierJoint): Observable<RetourDecision>{
    return this.http.post<RetourDecision>(this.obtenirInfoDocumentUrl, JSON.stringify(fichier), this.httpOptions);

  }

 public TeleverserDocument(fichier: FichierJoint): Observable<RetourDecision[]>{
   return this.http.post<RetourDecision[]>(this.NoDecisionUrl, JSON.stringify(fichier),  this.httpOptions);
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

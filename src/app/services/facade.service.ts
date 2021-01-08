import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Decision } from '../entitees/decision';
import { FichierJoint } from '../entitees/fichier-joint';
import { Juge } from '../entitees/juge';
import { ReponseBase } from './reponseBase';

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

  private DecisionURL = environment.apiBaseUrl + 'DecisionDetail';
  private DecisionRecherche = environment.apiBaseUrl + 'DecisionDetail/Requete/';
  private JugeUrl = environment.apiBaseUrl + 'JugeDetail';
  private NoDecisionUrl = environment.apiBaseUrl + 'DecisionDetail/NoDecision';
  public listJuge: Juge[];
  private URL = 'http://localhost:57759/api/DecisionDetail';
  formData: Decision = new Decision();
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // // public ObtenirDecision():Observable<ReponseBase<Decision>>{
  // //   return this.http.get<ReponseBase<Decision>>(this.obtenirDecision);
  // // }

  public obtenirDecisionList(): Observable<Decision[]>{
   return this.http.get<Decision[]>(this.DecisionURL);
  }
  public obtenirJuges(): Observable<Juge[]>{
    return this.http.get<Juge[]>(this.JugeUrl);
  }

 public TeleverserDocument(fichier: FichierJoint): Observable<FichierJoint>{
   console.log (fichier);
   return this.http.post<FichierJoint>(this.NoDecisionUrl, JSON.stringify(fichier),  this.httpOptions);
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

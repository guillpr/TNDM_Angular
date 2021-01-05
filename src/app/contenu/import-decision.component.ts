import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FacadeService } from '../services/facade.service';

@Component({
  selector: 'app-import-decision',
  templateUrl: './import-decision.component.html',
  styleUrls: ['./import-decision.component.css']
})
export class ImportDecisionComponent implements OnInit {


  myComponents: any[] = [];
  compteur = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  

  public ajouterJuge(){
    console.log('adding');
    const valeur = 'valeur';
    this.compteur++;
    const newValeur = valeur + this.compteur;
    console.log(newValeur);
    this.myComponents.push(newValeur);

  }
  public supprimerJuge(){
    this.compteur--;
    this.myComponents.splice(-1);
  }

}

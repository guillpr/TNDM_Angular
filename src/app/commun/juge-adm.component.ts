import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Decision } from '../entitees/decision';
import { Juge } from '../entitees/juge';
import { FacadeService } from '../services/facade.service';

@Component({
  selector: 'app-juge-adm',
  templateUrl: './juge-adm.component.html',
  styleUrls: ['./juge-adm.component.css']
})
export class JugeAdmComponent implements OnInit {
  public listeJuge: Juge[] = [];


  constructor(public facadeService: FacadeService) { }

 

  ngOnInit(): void {
    this.facadeService.obtenirJuges();

    this.facadeService.obtenirJuges()
     .subscribe( res => {
        this.listeJuge = res;
     });
  }

  public valeurJuge(){
    console.log('dans valeur Juge');
  }

}

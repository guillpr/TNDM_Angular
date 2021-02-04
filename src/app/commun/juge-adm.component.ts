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
  @Input() public formulaire: FormGroup;


  constructor(public facadeService: FacadeService) { }



  ngOnInit(): void {
    // this.facadeService.obtenirJuges();

    // this.facadeService.obtenirJuges()
    //  .subscribe( res => {
    //     this.listeJuge = res;
    //  });
  }
  public f(item: string): FormControl {
    return this.formulaire.get(`${item}`) as FormControl;
  }

  public valeurJuge(){
  }

}

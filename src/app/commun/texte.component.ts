import { Component, Input, OnInit, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TextesService } from '../services/textes.service';
import { compileComponentFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-texte',
  templateUrl: './texte.component.html',
  styleUrls: ['./texte.component.css']
})
export class TexteComponent implements OnInit {
  @Input()
  cle!: string;
  @Input()
  class!: string;
  @Input()
  variables!: string[];

  public result: any;
  public classeCss!: string;

  constructor(
    public textesServices: TextesService,
    private domSanitizer: DomSanitizer
  ) {


  }

  ngOnInit(){
    this.affecterTexte();
    this.classeCss = this.class;
    this.textesServices.changementLangue.subscribe(() => {
      this.affecterTexte();
    });
  }

  public affecterTexte() {
    let message = this.textesServices.obtenirTexte(this.cle);

    if (this.variables !== undefined) {
      for (let index =  0; index < this.variables.length; index++){
        const placeHolder = `{${index}}`;
        if (message === undefined){

        }
        message = message.replace(placeHolder, this.variables[index]);
      }
    }
    this.result = this.domSanitizer.sanitize(SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(message) );
  }

}

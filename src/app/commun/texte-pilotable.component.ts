import { Component, Input, OnInit, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TextesService } from '../services/textes.service';

@Component({
  selector: 'app-texte-pilotable',
  templateUrl: './texte-pilotable.component.html',
  styleUrls: ['./texte-pilotable.component.css']
})
export class TextePilotableComponent implements OnInit {
   @Input()
  texteFR!: string;
    @Input()
  texteEN!: string;
    @Input()
  class!: string;

    public result: any;
    public classeCss!: string;

  constructor(
        public textesService: TextesService,
        private domSanitizer: DomSanitizer
  ) {

   }

  ngOnInit(): void {
    this.affecterTexte();
    this.classeCss = this.class;
    this.textesService.changementLangue.subscribe(() => {
            this.affecterTexte();
        });
  }
  public affecterTexte() {
    const texte = this.textesService.langueCourante === 'fr' ? this.texteFR : this.texteEN;
    this.result = this.domSanitizer.sanitize(SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(texte));
}

}

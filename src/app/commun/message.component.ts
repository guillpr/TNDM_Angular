import { Component, Input, OnInit, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TextesService } from '../services/textes.service';

@Component({
    selector: 'app-message',
    styleUrls: ['./message.component.css'],
    templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
    @Input() cle: string;
    @Input() class: string;
    @Input() variables: string[];
    @Input() resoudreVariables = true;
    @Input() id: string;
    @Input() icone = true;

    public result: any;
    public classeCss: string;

    constructor(
        public textesService: TextesService,
        private domSanitizer: DomSanitizer) {

    }

    ngOnInit() {
        this.affecterTexte();
        this.classeCss = this.class;
        this.textesService.changementLangue.subscribe(() => {
            this.affecterTexte();
        });
    }

    public affecterTexte() {
      console.log('Dans affecter texte');
      let message = this.textesService.obtenirMessage(this.cle);
      console.log(this.cle);

      if (this.variables !== undefined) {
            for (let index = 0; index < this.variables.length; index++) {
                const placeHolder = `{${index}}`;
                let texte = '';
                if (this.resoudreVariables === true) {
                    texte = this.textesService.obtenirTexte(this.variables[index]);
                }
                else {
                    texte = this.variables[index];
                }
                message = message.replace(placeHolder, texte);
            }
        }

      this.result = this.domSanitizer.sanitize(SecurityContext.HTML,
            this.domSanitizer.bypassSecurityTrustHtml(message));
    }
}

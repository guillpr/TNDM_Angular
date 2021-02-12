import { FacadeService } from './../services/facade.service';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  texte: string;
  titre: string;
  texteBoutonOui: string;
  texteBoutonNon: string;
  reponse: string;
  afficherBoutonOui: boolean;
  valeurReponse: boolean;
}

@Component({
  selector: 'app-boite-dialogue',
  templateUrl: './boite-dialogue.component.html',
  styleUrls: ['./boite-dialogue.component.css']
})
export class BoiteDialogueComponent  {

  constructor( public dialogRef: MatDialogRef<BoiteDialogueComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               public facadeService: FacadeService) {
                this.data.reponse = 'N';
               }

               public onNoClick(): void {
                 console.log('dans click no');
                this.data.reponse = 'N';
                this.facadeService.reponseSuppressionFichier = false;
                this.dialogRef.close();
            }

            public onYesClick(): void {
              console.log('dans click yes');
                this.data.reponse = 'O';
                this.facadeService.reponseSuppressionFichier = true;
                this.dialogRef.close();
              }
}

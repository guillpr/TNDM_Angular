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
}

@Component({
  selector: 'app-boite-dialogue',
  templateUrl: './boite-dialogue.component.html',
  styleUrls: ['./boite-dialogue.component.css']
})
export class BoiteDialogueComponent  {

  constructor( public dialogRef: MatDialogRef<BoiteDialogueComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
                this.data.reponse = 'N';
               }

               public onNoClick(): void {
                this.data.reponse = 'N';
                this.dialogRef.close();
            }

            public onYesClick(): void {
                this.data.reponse = 'O';
                this.dialogRef.close();
              }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacadeService } from '../services/facade.service';
import { DialogData } from '../commun/boite-dialogue.component';

@Component({
  selector: 'app-boite-dialogue-juge',
  templateUrl: './boite-dialogue-juge.component.html',
  styleUrls: ['./boite-dialogue-juge.component.css']
})
export class BoiteDialogueJugeComponent  {

  constructor(public dialogRef: MatDialogRef<BoiteDialogueJugeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public facadeService: FacadeService)
     {   this.data.reponse = 'N';
     }


     ngOnInit(){
    const numero =  this.facadeService.numDecisionTemp;
    console.log('Data:' ,this.data);
    this.facadeService.ObtenirInfosDecision(numero)
       .subscribe((s) => {
         this.facadeService.listeDecision = s;
         console.log('Liste:' ,this.facadeService.listeDecision)
       });

     }
     public onNoClick(): void {
      console.log('dans click no');
      this.data.reponse = 'N';
    // this.facadeService.reponseSuppressionFichier = false;
      this.dialogRef.close();
 }


}

import { utf8Encode } from '@angular/compiler/src/util';
import { Input, SecurityContext, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { FichierJoint } from '../entitees/fichier-joint';
import { RetourDecision } from '../entitees/RetourDecision';
import { FacadeService } from '../services/facade.service';

@Component({
  selector: 'app-fichier-joint',
  templateUrl: './fichier-joint.component.html',
  styleUrls: ['./fichier-joint.component.css']
})
export class FichierJointComponent implements OnInit {

  @Input() public formulaire: FormGroup;

  @ViewChild('fileDropRef') fileInput: any;

  public id: Guid;

  messageErreurExtension = false;

  files: any[] = [];

  fichiers: FichierJoint[] = [];



  constructor(public domSanitizer: DomSanitizer , public facadeService: FacadeService) {
    this.id = Guid.create();
  }

  public f(item: string): FormControl {
    return this.formulaire.get(`${item}`) as FormControl;
  }

  ngOnInit(): void {

  }
  suppressionFichier(){

    console.log('Avant suppression' , this.fichiers);
    this.formulaire.get('nomFichier').setValue('');
    this.fichiers.shift();
    this.facadeService.retourDecision = undefined;
    console.log('Apres suppression' , this.fichiers);
    console.log('Retour décision: ' , this.facadeService.retourDecision);
  }

  onFileDropped($event: any){
    //  const f: FichierJoint =
    //  {
    //    id: this.id,
    //    contenu: $event.name,
    //    nom: $event.name,
    //    taille: $event.size
    //  };
    //  console.log($event);


     console.log(this.fichiers);
     console.log(this.fichiers.length);

     this.gererFichiers((event as DragEvent).dataTransfer.files);

  }
  fileBrowseHandler(files: any){

    this.gererFichiers(files);
    // this.fileInput.nativeElement.value = '';



  }

  gererFichier(file: any) {

    const ext = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
    console.log('Extension:');
    console.log(ext);

    if (ext === 'doc' || ext === 'docx')
   {

    const g = Guid.create();

    const reader = new FileReader();
    let f: FichierJoint;


    // this.getBase64(file).then(
    //   data => console.log(data)
    // );

    reader.readAsDataURL(file);
    reader.onload = (e) => {

      f =
      {
        decisionWord:  reader.result.toString().replace('data:application/msword;base64,' , ''),
        codeReseauDepot: 'PROUGUIL0001',
        nomDocumentDecision: file.name,
      };

      console.log('reader' ,f);

      console.log(this.formulaire.get('nomFichier'));
      console.log('formulaire: ' ,  this.formulaire);
      this.fichiers.push(f);
      console.log('Retour décision avant: ' , this.facadeService.retourDecision);
      this.facadeService.ObtenirInfoDocument(f)
      .subscribe((s) => {
        if(s != null){
          console.log(s);
          this.facadeService.retourDecision = s;



        }

      });


      // this.facadeService.TeleverserDocument(f)
      //  .subscribe((s) => {
      //    console.log(s);
      //  });
      this.messageErreurExtension = false;
      // console.log('Contenu du fichier' , this.fichiers[0].contenu);
    };
    console.log(f);
  }
  else{
    this.messageErreurExtension = true;
  }

    console.log(this.fichiers);
}
  gererFichiers(files: any) {
    const fichiers = Array.from(files);
    fichiers.forEach(element => {
      this.gererFichier(element);
    });
  }

  lireFichier(file: File){
    const fileReader = new FileReader();
    fileReader.onload = (e) => {

      const text = fileReader.result.toString();
      console.log(text);
    };
    fileReader.readAsText(file);

  }
   getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


}


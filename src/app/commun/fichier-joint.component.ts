import { SecurityContext, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { FichierJoint } from '../entitees/fichier-joint';

@Component({
  selector: 'app-fichier-joint',
  templateUrl: './fichier-joint.component.html',
  styleUrls: ['./fichier-joint.component.css']
})
export class FichierJointComponent implements OnInit {

  @ViewChild('fileDropRef') fileInput: any;

  public id: Guid;

  messageErreurExtension = false;

  files: any[] = [];

  fichiers: FichierJoint[] = [];

  constructor(public domSanitizer: DomSanitizer) {
    this.id = Guid.create();
  }

  ngOnInit(): void {


  }
  suppressionFichier(){
    console.log('Avant suppression' , this.fichiers);
    this.fichiers.shift();
    console.log('Apres suppression' , this.fichiers);
  }

  onFileDropped($event: any){
     const f: FichierJoint =
     {
       id: this.id,
       nom: $event.name,
       taille: $event.size
     };
     console.log($event);


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

    reader.readAsDataURL(file);
    reader.onload = (e) => {

      f =
      {
        // contenu: reader.result.toString(),
        id: this.id,
        nom: file.name,
       // nbPages: 0,
        taille: file.size,
        // type: '',
       // typeErreur: '',
       // message: '',
       // messageErreur: ''
      };
      this.fichiers.push(f);
      this.messageErreurExtension = false;
    };
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


}


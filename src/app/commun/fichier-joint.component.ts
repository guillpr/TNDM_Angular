import { utf8Encode } from '@angular/compiler/src/util';
import { SecurityContext, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { encode } from 'querystring';
import { FichierJoint } from '../entitees/fichier-joint';
import { FacadeService } from '../services/facade.service';

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

  constructor(public domSanitizer: DomSanitizer , public facadeService: FacadeService) {
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

   // if (ext === 'doc' || ext === 'docx')
  // {

    const g = Guid.create();

    const reader = new FileReader();
    let f: FichierJoint;




    reader.readAsDataURL(file);
    reader.onload = (e) => {

      f =
      {
        contenu: reader.result.toString(),
        id: 'idBidon',
        nom: file.name,
       // nbPages: 0,
        taille: file.size,
        // type: '',
       // typeErreur: '',
       // message: '',
       // messageErreur: ''
      };
      this.fichiers.push(f);

     // this.lireFichier(file);



      this.facadeService.TeleverserDocument(f)
       .subscribe((s) => {
         f.contenu = 'data:image/gif/base64,' + s.contenu;
         f.id =  s.id;
         f.nom = s.nom;
         f.taille = s.taille;
       });
      this.messageErreurExtension = false;
      // console.log('Contenu du fichier' , this.fichiers[0].contenu);
    };
 // }
 // else{
    this.messageErreurExtension = true;
 // }

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


}


import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../services/facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acces-refuse',
  templateUrl: './acces-refuse.component.html',
  styleUrls: ['./acces-refuse.component.css']
})
export class AccesRefuseComponent implements OnInit {

  constructor(public facadeService: FacadeService,
              public router: Router) { }

  ngOnInit(): void {
    this.facadeService.obtenirCodeUsagerAD()
    .subscribe(res => {
      console.log('AD:' , res);
      if(res.accesUsager !== 0){
        this.router.navigateByUrl('/');
      }

    });
    // .subscribe(res => {
    //   console.log('Résultat AD : ' , res);
    //   this.facadeService.listeAd = res;
    //   console.log('Liste AD service de facade: ' , this.facadeService.listeAd);
    //   console.log('le nom utilisateur' , this.facadeService.listeAd.codeReseau);
    // }

  }

}

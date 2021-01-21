import { Component, OnInit } from '@angular/core';
import { FacadeService } from './services/facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PresentationTNDM';

  constructor(public facadeService: FacadeService) { }


  ngOnInit(): void {
    this.facadeService.obtenirCodeUsagerAD()
    .subscribe((s) => {
      this.facadeService.listeAd = s;
    });


  }
}

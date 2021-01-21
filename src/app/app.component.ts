import { Component, OnInit } from '@angular/core';
import { FacadeService } from './services/facade.service';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
      dateInput: 'YYYY-MM-DD'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
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

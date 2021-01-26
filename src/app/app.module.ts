
// Importation composants
import { AppComponent } from './app.component';
import { JugeComponent } from './contenu/juge.component';
import { InfoDecisionAdjointeComponent } from './contenu/info-decision-adjointe.component';
import { InfoDecisionJugeComponent } from './contenu/info-decision-juge.component';
import { ImportDecisionComponent } from './contenu/import-decision.component';
import { GestionPreferencesComponent } from './contenu/gestion-preferences.component';
import { FondCommunAdjJugeComponent } from './commun/fond-commun-adj-juge.component';
import { InsertDecisionComponent } from './commun/insert-decision.component';
import { BanniereComponent } from './commun/banniere.component';
import { TexteComponent } from './commun/texte.component';
import { TextePilotableComponent } from './commun/texte-pilotable.component';
import { AdjointeComponent } from './contenu/adjointe.component';
import { JugeAdmComponent } from './commun/juge-adm.component';
import { FichierJointComponent } from './commun/fichier-joint.component';

// Dialog
import { BoiteDialogueComponent } from './commun/boite-dialogue.component';
// Spinner
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';
// Guard
import { CanDeactivateGuard } from './commun/can-deactivate.guard';

// Importation Material
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TestMatTableComponent } from './commun/test-mat-table.component';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import {MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from './commun/date-formats';

// Moment
import { MomentDateModule } from '@angular/material-moment-adapter';




// Importation pipe
import { Searchfilter3Pipe } from './commun/searchfilter3.pipe';
import { DateFiltrePipe } from './commun/date-filtre.pipe';

import { DatePipe } from '@angular/common'

// Importation Directive
import { SortDirective } from './directive/sort.directive';
import { DndDirective } from './commun/dnd.directive';

// Autres importations
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './commun/message.component';
import { WinAuthInterceptor } from './commun/WinAuthInterceptor';
import { AccesRefuseComponent } from './commun/acces-refuse.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    BanniereComponent,
    TexteComponent,
    TextePilotableComponent,
    AdjointeComponent,
    JugeComponent,
    InfoDecisionAdjointeComponent,
    InfoDecisionJugeComponent,
    ImportDecisionComponent,
    FondCommunAdjJugeComponent,
    InsertDecisionComponent,
    Searchfilter3Pipe,
    DateFiltrePipe,
    TestMatTableComponent,
    SortDirective,
    FichierJointComponent,
    DndDirective,
    JugeAdmComponent,
    BoiteDialogueComponent,
    MessageComponent,
    AccesRefuseComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: AdjointeComponent },
      {path: 'adjointe', component: AdjointeComponent },
      {path: 'juge', component: JugeComponent },
      {path: 'infoAdjointe', component: InfoDecisionAdjointeComponent },
      {path: 'infoJuge', component: InfoDecisionJugeComponent },
      {path: 'importDecision', component: ImportDecisionComponent , canDeactivate: [CanDeactivateGuard] },
      {path: 'gestionPreferences', component: GestionPreferencesComponent },
      {path: 'accesRefuse', component: AccesRefuseComponent }
    ]),
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    DragDropModule,
    MatInputModule,
    MomentDateModule,
    NgxSpinnerModule,
    MatFormFieldModule
  ],
  providers: [
    HttpClientModule,
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue:  'fr'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
  }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

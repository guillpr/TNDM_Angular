
// Importation composants
import { AppComponent } from './app.component';
import { JugeComponent } from './contenu/juge.component';
import { InfoDecisionAdjointeComponent } from './contenu/info-decision-adjointe.component';
import { ImportDecisionComponent } from './contenu/import-decision.component';
import { GestionPreferencesComponent } from './contenu/gestion-preferences.component';
import { FondCommunAdjJugeComponent } from './commun/fond-commun-adj-juge.component';
import { InsertDecisionComponent } from './commun/insert-decision.component';
import { BanniereComponent } from './commun/banniere.component';
import { TexteComponent } from './commun/texte.component';
import { TextePilotableComponent } from './commun/texte-pilotable.component';
import { AdjointeComponent } from './contenu/adjointe.component';

// Importation Material
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TestMatTableComponent } from './commun/test-mat-table.component';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
// Importation pipe
import { Searchfilter3Pipe } from './commun/searchfilter3.pipe';
import { DateFiltrePipe } from './commun/date-filtre.pipe';
// Importation Directive
import { SortDirective } from './directive/sort.directive';

// Autres importations
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FichierJointComponent } from './commun/fichier-joint.component';
import { DndDirective } from './commun/dnd.directive';
import { JugeAdmComponent } from './commun/juge-adm.component';


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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: AdjointeComponent },
      {path: 'adjointe', component: AdjointeComponent },
      {path: 'juge', component: JugeComponent },
      {path: 'infoAdjointe', component: InfoDecisionAdjointeComponent },
      {path: 'importDecision', component: ImportDecisionComponent },
      {path: 'gestionPreferences', component: GestionPreferencesComponent }
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
    DragDropModule
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, AfterViewInit, OnInit , ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Decision } from '../entitees/decision';
import { FacadeService } from '../services/facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-mat-table',
  templateUrl: './test-mat-table.component.html',
  styleUrls: ['./test-mat-table.component.css']
})
export class TestMatTableComponent implements OnInit {
  //public list: Decision[] = this.facadeService.list;
  displayedColumns: string[] = ['numeroDecision', 'numeroDossier', 'nbDossier', 'dateImportation' , 'dateFinDelibere' , 'juge' , 'description' , 'durRestante' , 'priorite', 'statut'];
 // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
 //dataSource = new  MatTableDataSource(this.list) ;
 MyDataSource: any;

  @ViewChild(MatSort) sort: MatSort;



  constructor(public facadeService: FacadeService) {

  }

  ngOnInit() {
    this.facadeService.obtenirDecisionList()
    .subscribe(
      res => {
        this.MyDataSource = new MatTableDataSource();
        this.MyDataSource.data = res;
        this.MyDataSource.sort = this.sort;
      },
      error => {
        console.log('Erreur quand je recois ' + error);
      }
    );

  }

}

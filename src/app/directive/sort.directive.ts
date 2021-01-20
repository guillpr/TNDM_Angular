import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { FacadeService } from '../services/facade.service';
import { Sort } from '../utils/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any>;


  constructor(private renderer: Renderer2 , private targetElem: ElementRef , public facadeService: FacadeService) { }

  @HostListener('click')
  sortData(){

    // create Object of Sort Class
    const sort = new Sort();
    // Get Reference of Current Clicked Element
    const elem = this.targetElem.nativeElement;
    // Get In Witch Order List should be sorted by default it shoud be set to desc on element attribute
    const order = elem.getAttribute('data-order');
    // Get the Property Type specially set [data-type=date] if it is date field
    const type = elem.getAttribute('data-type');
   // Get the Property Name from Element Attribute
    const property = elem.getAttribute('data-name');
    if (order === 'desc'){

     this.appSort.sort(sort.startSort(property, order, type));
     elem.setAttribute('data-order', 'asc');
     this.facadeService.listeDecisions = this.appSort;

   }
   else{
     this.appSort.sort(sort.startSort(property, order, type));
     elem.setAttribute('data-order' , 'desc');
     this.facadeService.listeDecisions = this.appSort;
   }
  }

}

import { Directive ,Output , EventEmitter , HostBinding , HostListener , OnInit } from '@angular/core';
import { detect } from "detect-browser";

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  constructor() { }

}

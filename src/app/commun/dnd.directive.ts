import { Directive ,Output , EventEmitter , HostBinding , HostListener , OnInit } from '@angular/core';
import { detect } from "detect-browser";

@Directive({
  selector: '[appDnd]'
})
export class DndDirective implements OnInit{
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  private navigateur: string;


ngOnInit(){
  const browser = detect();
  this.navigateur = browser.name;
}

// Dragover listener
@HostListener('dragover', ['$event']) onDragOver(evt: any) {
  evt.preventDefault();
  evt.stopPropagation();
  if (this.navigateur !== 'ie') {
    this.fileOver = true;
  }
}
 // Dragleave listener
 @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
  evt.preventDefault();
  evt.stopPropagation();
  this.fileOver = false;
}
 // Drop listener
 @HostListener('drop', ['$event']) public ondrop(evt: any) {
  evt.preventDefault();
  evt.stopPropagation();
  this.fileOver = false;
  let files = evt.dataTransfer.files;
  if (files.length > 0) {
    this.fileDropped.emit(files);
  }
}



}

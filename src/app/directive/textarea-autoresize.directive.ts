import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]'
})
export class TextareaAutoresizeDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }



@HostListener(':input')
  onInput() {
    this.resize();
  }
  ngOnInit() {
    console.log('Dans la directive texte area');
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() =>{this.resize()},200 );
    }
  }
  resize() {
    this.elementRef.nativeElement.style.height = '0';

    this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';
    console.log('Valeur height: ' , this.elementRef.nativeElement.style.height)
}
}


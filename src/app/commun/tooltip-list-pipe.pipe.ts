
import { Pipe, PipeTransform } from '@angular/core';
import { DossierTAQ } from '../entitees/dossierTaq';

@Pipe({
  name: 'tooltipListPipe'
})
export class TooltipListPipePipe implements PipeTransform {

  transform(lines: DossierTAQ[]): string {
    let list = '';
    console.log(lines);

    for (let i = 0; i < lines.length; i++){
      if (lines[i].requerant === ''){
        list +=   lines[i].noDossierTAQ  + '\n';
      }
      else{
        list +=   lines[i].noDossierTAQ + ' - ' + lines[i].requerant + '\n';
      }
      if (i === 3)
       {
        list +=  'et autres ';
        return list;
       }
     }
    console.log(list);


   // list += lines + '\n';

    // lines.forEach(line => {
    //   list += '• ' + line + '\n';
    // });

    return list;
  }

}

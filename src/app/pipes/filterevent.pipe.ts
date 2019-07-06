import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterevent'
})
export class FiltereventPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

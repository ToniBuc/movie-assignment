import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: number | undefined): any {
    if (value) {
      const hours = Math.floor(value / 60);
      const minutes = Math.floor(value % 60);
      return hours + ' h ' + minutes + ' m';
    }

    return null;
  }
}

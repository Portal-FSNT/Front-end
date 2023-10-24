import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(time: string): string {
    if (!time) {
      return '';
    }

    const timeParts = time.split(':');
    const hours = this.padNumber(Number(timeParts[0]), 2);
    const minutes = this.padNumber(Number(timeParts[1]), 2);

    return `${hours}:${minutes}`;
  }

  private padNumber(value: number, length: number): string {
    return value.toString().padStart(length, '0');
  }
}

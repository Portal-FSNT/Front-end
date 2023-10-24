import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'date'
})
export class DatePipe implements PipeTransform {

    transform(value: string | Date): string {
        if (!value) return '';
    
        const date = new Date(value);
        const day = this.padNumber(date.getDate());
        const month = this.padNumber(date.getMonth() + 1);
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
      }
      
      private padNumber(value: number): string {
        return value.toString().padStart(2, '0');
      }
}
import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoPipeTs',
})
export class OrdenIngresoPipeTsPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }

      return 0;
    });
  }
}

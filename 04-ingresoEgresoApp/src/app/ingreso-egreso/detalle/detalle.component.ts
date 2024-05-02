import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ``,
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingresoEgresoSubscription: Subscription | undefined;
  constructor(
    private _ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingresoEgresoSubscription = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => {
        this.ingresosEgresos = items;
      });
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubscription?.unsubscribe();
  }

  borrarIngresoEgreso(uid: string = '') {
    this.store.dispatch(ui.isLoading());
    this._ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire('Borrado', 'Item borrado correctamente', 'success');
        this.store.dispatch(ui.stopLoading());
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}

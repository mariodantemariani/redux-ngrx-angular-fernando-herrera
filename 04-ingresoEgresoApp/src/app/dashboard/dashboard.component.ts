import { Component, OnDestroy, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | undefined;
  constructor(
    private _ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('user')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        console.log(user);
        this._ingresoEgresoService
          .initIngresosEgresosListener(user!.uid)
          .subscribe((ingresosEgresos: any) => {
            console.log(ingresosEgresos);
            this.store.dispatch(
              ingresoEgresoActions.setItems({ items: ingresosEgresos })
            );
            console.log('ingresosEgresospaso');
          });
        console.log('user');
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}

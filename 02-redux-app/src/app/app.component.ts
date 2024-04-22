import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './contador/contador.actions';
import { AppState } from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  contador!: number;

  constructor(private store: Store<AppState>) {
    this.store.select('contador').subscribe((contador) => {
      this.contador = contador;
    });
  }

  incrementar() {
    this.store.dispatch(Actions.incrementar());
  }

  decrementar() {
    this.store.dispatch(Actions.decrementar());
  }

  cambiarContador(contador: number) {}
}

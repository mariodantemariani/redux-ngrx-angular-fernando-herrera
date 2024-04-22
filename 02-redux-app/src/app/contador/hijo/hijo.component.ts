import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as actions from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: ``,
})
export class HijoComponent implements OnInit {
  contador: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.subscribe((state) => {
      this.contador = state.contador;
    });
  }

  dividir() {
    this.store.dispatch(actions.dividir({ numero: 2 }));
  }

  multiplicar() {
    this.store.dispatch(actions.multiplicar({ numero: 3 }));
  }
}

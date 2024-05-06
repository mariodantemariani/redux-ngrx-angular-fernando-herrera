import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
})
export class UsuarioComponent implements OnInit, OnDestroy {
  usuario: Usuario;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select('usuario').subscribe(({ user, loading, error }) => {
      this.usuario = user;
    });

    this.router.params.subscribe(({ id }) => {
      this.store.dispatch(cargarUsuario({ id }));
    });
  }

  ngOnDestroy(): void {}
}

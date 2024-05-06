import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';

import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  constructor(private store: Store<AppState>) {}
  //private usuarioService: UsuarioService;

  ngOnInit() {
    this.store.select('usuarios').subscribe(({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch(cargarUsuarios());
    // this.usuarioService.getUsers().subscribe((users) => {
    //   console.log(users);
    //   this.usuarios = users;
    // });
  }
}

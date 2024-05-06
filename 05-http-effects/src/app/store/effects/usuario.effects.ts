import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) {}

  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap((action) =>
        this.usuariosService.getUserById(action.id).pipe(
          //tap((data) => console.log('effect', data)),
          map((user) => usuarioActions.cargarUsuarioSuccess({ usuario: user })),
          catchError((error) =>
            of(usuarioActions.cargarUsuarioError({ payload: error }))
          )
        )
      )
    )
  );
}

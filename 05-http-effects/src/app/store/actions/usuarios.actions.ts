import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] cargarUsuarios');

export const cargarUsuariosSuccess = createAction(
  '[Usuarios] cargarUsuariosSuccess',
  props<{ usuarios: Usuario[] }>()
);

export const cargarUsuariosError = createAction(
  '[Usuarios] cargarUsuariosError',
  props<{ payload: any[] }>()
);

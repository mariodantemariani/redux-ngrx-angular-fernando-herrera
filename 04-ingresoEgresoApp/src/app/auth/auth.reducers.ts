import { createReducer, on } from '@ngrx/store';
import * as action from './auth.actions';
import { Usuario } from '../models/usuario.model';

export interface State {
  user: Usuario | null;
}

export const initialState: State = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(action.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(action.unSetUser, (state) => ({ ...state, user: null }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}

import { createReducer, on } from '@ngrx/store';
import {
  incrementar,
  decrementar,
  multiplicar,
  reset,
  dividir,
} from './contador.actions';

//vieja forma de hacerlo
// export function contadorReducer(state: number = 10, action: Action) {
//   switch (action.type) {
//     case incrementar.type:
//       return state + 1;
//     case decrementar.type:
//       return state - 1;
//     // case 'MULTIPLICAR':
//     //   return state * action.payload;
//     // case 'DIVIDIR':
//     //   return action.payload !== 0 ? state / action.payload : state;
//     case reset.type:
//       return (state = 0);
//     default:
//       return state;
//   }
// }

export const initialState = 20;

const _contadorReducer = createReducer(
  initialState,
  on(incrementar, (state) => state + 1),
  on(decrementar, (state) => state - 1),
  on(multiplicar, (state, { numero }) => state * numero),
  on(dividir, (state, { numero }) => state / numero),
  on(reset, (state) => initialState)
);

export function contadorReducer(state: any, action: any) {
  return _contadorReducer(state, action);
}

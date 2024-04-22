import {
  decrementadorAction,
  dividirAction,
  incrementadorAction,
  miltiplicarAction,
  resetAction,
} from "./contador/contador.actions";
import { Action } from "./ngrx-fake/ngrx";

export function reducer(state: number = 10, action: Action) {
  switch (action.type) {
    case "INCREMENTAR":
      return state + 1;
    case "DECREMENTAR":
      return state - 1;
    case "MULTIPLICAR":
      return state * action.payload;
    case "DIVIDIR":
      return action.payload !== 0 ? state / action.payload : state;
    case "RESET":
      return (state = 0);
    default:
      return state;
  }
}

console.log(reducer(10, incrementadorAction)); //11

console.log(reducer(10, decrementadorAction)); //9

console.log(reducer(10, miltiplicarAction)); //20

console.log(reducer(10, dividirAction)); //5

console.log(reducer(10, resetAction)); //0

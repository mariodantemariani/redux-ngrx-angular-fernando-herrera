import {
  contadorReducer,
  incrementadorAction,
  miltiplicarAction,
} from "./contador";
import { Reducer } from "./ngrx-fake/ngrx";

class Store<T> {
  constructor(private reducer: Reducer<T>, private state: T) {}

  getState() {
    return this.state;
  }

  dispatch(action: any) {
    this.state = this.reducer(this.state, action);
  }
}

const store = new Store(contadorReducer, 10);

console.log(store.getState());

store.dispatch(incrementadorAction);
store.dispatch(incrementadorAction);
console.log(store.getState());

store.dispatch(miltiplicarAction);
console.log(store.getState());

import { Store, createStore } from "redux";
import { contadorReducer, incrementadorAction } from "./contador";

const store: Store = createStore(contadorReducer);

store.subscribe(() => {
  console.log("subs:", store.getState());
});

//store.dispatch(incrementadorAction);

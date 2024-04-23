//nos dice como estan los states globales de la app.

import { Todo } from './todos/models/todo.model';

export interface AppState {
  todos: Todo[];
  //filter: filtrosValidos;
}

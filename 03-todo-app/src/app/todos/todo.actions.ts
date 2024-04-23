import { createAction, props } from '@ngrx/store';

export const crear = createAction(
  '[TODO] crear TODO',
  props<{ texto: string }>()
);
// export const decrementar = createAction('[Contador] Decrementar');

// export const multiplicar = createAction(
//   '[Contador] Multiplicar',
//   props<{ numero: number }>()
// );

// export const dividir = createAction(
//   '[Contador] Dividir',
//   props<{ numero: number }>()
// );

// export const reset = createAction('[Contador] Reset');

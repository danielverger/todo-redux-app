import { createReducer, on } from '@ngrx/store';
import { borrar, clearCompleted, crear, editar, toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState:Todo[] = [
  new Todo('prueba initial store'),
  new Todo('prueba 1', true),
  new Todo('prueba 2'),
];

export const todoReducer = createReducer(
  initialState,
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),
  on(toggle, (state, {id}) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    })
  }),
  on(editar, (state, {id, texto}) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto
        }
      } else {
        return todo;
      }
    })
  }),
  on(toggleAll, (state, {seleccionar}) => {
    return state.map(todo => {
        return {
          ...todo,
          completado: seleccionar
        }
      })
  }),
  on(borrar, (state, {id}) => {
    return state.filter(todo => todo.id !== id )
  }),
  on(clearCompleted, (state ) => {
    return state.filter(todo => !todo.completado )
  }),
  // on(decrement, (state) => state - 1),
  // on(reset, (state) => 0)
);
import { StoreModule } from '@ngrx/store';
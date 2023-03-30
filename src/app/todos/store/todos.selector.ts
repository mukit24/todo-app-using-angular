import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todoState } from './todos.reducer';

export const getTodoState = createFeatureSelector<todoState>('todos');

export const getTodos = createSelector(
  getTodoState,
  (state: todoState) => state.todos
);

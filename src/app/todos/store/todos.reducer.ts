import { createReducer, on } from '@ngrx/store';
import { TodosDto } from '../models/todos-dto';
import { getTodosErrors, getTodosSuccess, loadTodos } from './todos.actions';

export interface todoState {
    todos : TodosDto[],
    loading : boolean,
    error: any
};

export const initialState : todoState = {
    todos : [],
    loading : false,
    error : ''
};

export const todoReducer = createReducer(
    initialState,
    on(loadTodos, state => ({ ...state, loading: true })),
    on(getTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
    on(getTodosErrors, (state, {error}) => ({ ...state, error, loading: false })),
);
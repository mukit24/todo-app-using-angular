import { createAction, props } from '@ngrx/store';
import { TodosDto } from '../models/todos-dto';

export const loadTodos = createAction('[Todo Component] Load Todos');
export const getTodosSuccess = createAction('[Todo Component] Load Todo Success', props<{ todos: TodosDto[] }>());
export const getTodosErrors = createAction('[Todo Component] Load Todo Error', props<{ error : any}>());

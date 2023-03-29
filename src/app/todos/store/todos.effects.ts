import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap,switchMap,exhaustMap, catchError } from 'rxjs/operators';
import { TodosDto } from '../models/todos-dto';
import { TodosService } from '../services/todos.service';
import { getTodosErrors, getTodosSuccess, loadTodos } from './todos.actions';

@Injectable()
export class TodoEffects {
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.getAllTodos().pipe(
          map((todos: any) => getTodosSuccess({todos})),
          catchError((error) => of(getTodosErrors({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodosService) {}
}
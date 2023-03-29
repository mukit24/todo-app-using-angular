import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodosDto } from '../models/todos-dto';
import { todoState } from '../store/todos.reducer';

@Component({
  selector: 'app-testtt',
  templateUrl: './testtt.component.html',
})
export class TestttComponent{
  todos : TodosDto[];
  
  constructor(private store: Store<{ todos: todoState }>) {
    this.getTodos();
   }
  // ngOnInit(): void {
  //   this.getTodos();
  // }
  
  getTodos () {
    this.store.select( state => state.todos.todos).subscribe(res => console.log(res));
    // this.store.select( state => state.todos.todos).subscribe(res => this.todos = res);
    // console.log(this.todos);
  }
}

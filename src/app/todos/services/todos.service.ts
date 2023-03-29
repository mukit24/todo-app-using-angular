import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private url = 'https://jsonplaceholder.typicode.com/todos/';

  constructor( private http : HttpClient) { }

  getAllTodos () {
    return this.http.get(this.url);
  }

  getIncompleteTodos () {
    return this.http.get(this.url+'?completed=false');
  }

  getCompleteTodos () {
    return this.http.get(this.url+'?completed=true');
  }

  createTodo (todo : any) {
    return this.http.post(this.url, JSON.stringify(todo));
  }

  deleteTodo (id: any){
    return this.http.delete(this.url+id);
  }

  updateTodo (todo : any){
    return this.http.patch(this.url+todo.id, todo);
  }
  
}

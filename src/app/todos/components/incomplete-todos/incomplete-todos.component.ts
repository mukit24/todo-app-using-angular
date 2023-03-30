import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TodosDto } from '../../models/todos-dto';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-incomplete-todos',
  templateUrl: './incomplete-todos.component.html',
})

export class IncompleteTodosComponent{
  @Input() incompleteTodos : TodosDto[];
  @Input() completeTodos : TodosDto[];

  showSuccessUpdate() {
    this.message.add({ severity: 'success', summary: 'Updated', detail: 'Successfully updated Todo' });
  }

  constructor(private service: TodosService, private message: MessageService) { }

  
  markAsComplete(todo: TodosDto) {
    console.log(this.incompleteTodos);
    todo.completed = true;
    this.service.updateTodo(todo)
      .subscribe((response: any) => {
        console.log(response);
        let index = this.incompleteTodos.indexOf(todo);
        this.incompleteTodos.splice(index, 1);
        this.completeTodos.unshift(response);
        this.showSuccessUpdate();
      })
  }
}

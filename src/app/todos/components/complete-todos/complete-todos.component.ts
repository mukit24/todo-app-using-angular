import { Component, Input, OnInit } from '@angular/core';
import { TodosDto } from '../../models/todos-dto';

@Component({
  selector: 'app-complete-todos',
  templateUrl: './complete-todos.component.html',
})

export class CompleteTodosComponent{
  @Input() incompleteTodos : TodosDto[];
  @Input() completeTodos : TodosDto[];
}

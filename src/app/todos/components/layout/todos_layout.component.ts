import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TodosService } from '../../services/todos.service';
import { TodosDto } from '../../models/todos-dto';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { todoState } from '../../store/todos.reducer';
import { loadTodos } from '../../store/todos.actions';
import { getTodos } from '../../store/todos.selector';

@Component({
  selector: 'app-todos',
  templateUrl: './todos_layout.component.html',
})

export class TodosComponent implements OnInit {
  myForm: FormGroup;
  completeTodos: TodosDto[];
  incompleteTodos: TodosDto[];


  constructor(private fb: FormBuilder, private service: TodosService, private message: MessageService, private store: Store<{ todos: todoState }>) { }

  showSuccessCreated() {
    this.message.add({ severity: 'success', summary: 'Created', detail: 'Successfully created Todo' });
  }


  ngOnInit(): void {
    this.store.dispatch(loadTodos());

    this.store.select(getTodos).subscribe(res => {
      let todos : TodosDto[] = JSON.parse(JSON.stringify(res));
      this.incompleteTodos = todos.filter(todo => todo.completed === false);
      this.completeTodos = todos.filter(todo => todo.completed === true);
    });

    // form validation
    this.myForm = this.fb.group({
      taskName: ['', RxwebValidators.required({ 'message': 'Task Name Can Not Be Blank' })]
    })

  }

  // getter 
  get taskName() {
    return this.myForm.controls['taskName'];
  }

  // create a todo
  onSubmit() {
    let todo: TodosDto = {
      title: this.myForm.value.taskName,
      completed: false,
      id : 1,
      userId : 3
    }
    this.myForm.reset();

    this.service.createTodo(todo)
      .subscribe((response: any) => {
        todo.id = response.id;
        this.incompleteTodos.unshift(todo);
        this.showSuccessCreated();
      })
  }
}


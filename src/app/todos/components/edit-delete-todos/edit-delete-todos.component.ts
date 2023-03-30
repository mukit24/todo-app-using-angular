import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MessageService } from 'primeng/api';
import { TodosDto } from '../../models/todos-dto';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-edit-delete-todos',
  templateUrl: './edit-delete-todos.component.html',
})
export class EditDeleteTodosComponent implements OnInit {
  @Input() incompleteTodos : TodosDto[];
  @Input() completeTodos : TodosDto[];
  @Input() todo : any;

  modalForm: FormGroup;
  display: boolean;
  updateTodo: TodosDto;
  
  showSuccessUpdate() {
    this.message.add({ severity: 'success', summary: 'Updated', detail: 'Successfully updated Todo' });
  }

  showSuccessDelete() {
    this.message.add({ severity: 'success', summary: 'Deleted', detail: 'Successfully deleted Todo' });
  }

  constructor(private service: TodosService, private message: MessageService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      taskNameUpdate: ['', RxwebValidators.required()]
    })
  }

  onDelete(todo: TodosDto) {
    this.service.deleteTodo(todo.id)
      .subscribe((response: any) => {
        this.showSuccessDelete();
        if (todo.completed === true) {
          let index = this.completeTodos.indexOf(todo);
          this.completeTodos.splice(index, 1);
        } else {
          let index = this.incompleteTodos.indexOf(todo);
          this.incompleteTodos.splice(index, 1);
        }
      })
  }

  showModalDialog(todo: TodosDto) {
    this.updateTodo = todo;
    this.display = true;
    this.modalForm.controls['taskNameUpdate'].setValue(todo.title);
  }

  onUpdate() {
    // console.log(this.incompleteTodos);
    debugger
    this.updateTodo.title = this.modalForm.value.taskNameUpdate;
    this.display = false;
    this.service.updateTodo(this.updateTodo)
      .subscribe((response: any) => {
        this.showSuccessUpdate();
        if (this.updateTodo.completed === true) {
          let index = this.completeTodos.indexOf(this.updateTodo);
          this.completeTodos.splice(index, 1, this.updateTodo);
        } else {
          let index = this.incompleteTodos.indexOf(this.updateTodo);
          this.incompleteTodos.splice(index, 1, this.updateTodo);
        }
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TodosService } from '../services/todos.service';
import { TodosDto } from '../models/todos-dto';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {
  myForm: FormGroup;
  modalForm: FormGroup;
  completeTodos: TodosDto[];
  incompleteTodos: TodosDto[];
  display: boolean;
  updateTodo : TodosDto;
  
  constructor(private fb: FormBuilder, private service: TodosService, private message : MessageService) { }

  showSuccessCreated() {
    this.message.add({ severity: 'success', summary: 'Created', detail: 'Successfully created Todo' });
  }

  showSuccessUpdate(){
    this.message.add({ severity: 'success', summary: 'Updated', detail: 'Successfully updated Todo' });
  }

  showSuccessDelete(){
    this.message.add({ severity: 'success', summary: 'Deleted', detail: 'Successfully deleted Todo' });
  }

  ngOnInit(): void {
    // form validation

    this.modalForm = this.fb.group({
      taskNameUpdate: ['', RxwebValidators.required()]
    })
    
    this.myForm = this.fb.group({
      taskName: ['', RxwebValidators.required({ 'message': 'Task Name Can Not Be Blank' })]
    })


    // get incomplete task
    this.service.getIncompleteTodos()
      .subscribe({
        next: (response: any) => {
          // console.log(response);
          this.incompleteTodos = response;
        }, error: error => {
          this.message.add({
            severity: 'error',
            summary: error.name,
            detail: error.message,
            sticky: true
        });
        }
      })

    // get complete task
    this.service.getCompleteTodos()
      .subscribe({
        next: (response: any) => {
          // console.log(response);
          this.completeTodos = response;
          // console.log(this.completeTodos);
        }, error: error => {
          console.log(error)
        }
      })
  }

  // getter 
  get taskName() {
    return this.myForm.controls['taskName'];
  }

  // create a todo
  onSubmit() {
    let todo: any = {
      title: this.myForm.value.taskName,
      completed: false
    }
    this.myForm.reset();

    this.service.createTodo(todo)
      .subscribe((response: any) => {
        todo.id = response.id;
        this.incompleteTodos.unshift(todo);
        this.showSuccessCreated();
      })
  }

  markAsComplete(todo: any) {
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

  onDelete(todo: any) {
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
  showModalDialog(todo : any) {
    this.updateTodo = todo;
    console.log(this.completeTodos.indexOf(this.updateTodo));
    this.display = true;
    this.modalForm.controls['taskNameUpdate'].setValue(todo.title);
}

onUpdate() {
    // console.log(this.completeTodos.indexOf(todo));
    this.updateTodo.title = this.modalForm.value.taskNameUpdate;
    this.display = false;
    this.service.updateTodo(this.updateTodo)
      .subscribe((response : any)=>{
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

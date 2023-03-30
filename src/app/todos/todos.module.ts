import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {InputTextModule} from 'primeng/inputtext';
import { TodosComponent } from './components/layout/todos_layout.component';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { TodosService } from './services/todos.service';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/todos.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/todos.effects';
import { IncompleteTodosComponent } from './components/incomplete-todos/incomplete-todos.component';
import { CompleteTodosComponent } from './components/complete-todos/complete-todos.component';
import { EditDeleteTodosComponent } from './components/edit-delete-todos/edit-delete-todos.component';


@NgModule({
  declarations: [
    TodosComponent,
    IncompleteTodosComponent,
    CompleteTodosComponent,
    EditDeleteTodosComponent,
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CheckboxModule,
    DialogModule,
    BrowserAnimationsModule,
    ToastModule,
    StoreModule.forRoot({ todos : todoReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([TodoEffects]),
  ],
  providers: [
    TodosService,
    MessageService
  ],
  exports: [
    TodosComponent
  ]
})
export class TodoModule { }

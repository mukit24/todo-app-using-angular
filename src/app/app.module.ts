import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import { TodosComponent } from './todos/components/todos.component';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { TodosService } from './todos/services/todos.service';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent
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
    ToastModule
  ],
  providers: [
    TodosService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

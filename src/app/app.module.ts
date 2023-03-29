import { NgModule, isDevMode } from '@angular/core';
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
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './todos/store/todos.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todos/store/todos.effects';
import { TestttComponent } from './todos/components/testtt.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TestttComponent
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
    EffectsModule.forRoot([TodoEffects])
  ],
  providers: [
    TodosService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TodoModule } from './todos/todos.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TodoModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

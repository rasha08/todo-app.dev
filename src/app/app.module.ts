import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header-component';
import { FooterComponent } from './components/footer/footer-component';
import { ToDoComponent } from './components/todo/todo-component';
import { ToDoListComponent } from './components/todo/todo-list/todo-list-component';
import { EditToDoComponent } from './components/todo/edit-todo/edit-todo-component';
import { AddToDoComponent } from './components/todo/add-todo/add-todo-component';

// Services
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ToDoComponent,
    ToDoListComponent,
    EditToDoComponent,
    AddToDoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ TodoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

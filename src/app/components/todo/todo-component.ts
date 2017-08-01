import { Component, OnInit } from '@angular/core';
import { ToDoInterface } from '../../interfaces/todo.interface';
import { ToDo } from '../../classes/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-component.html',
  styleUrls: ['todo-component.css']
})

export class ToDoComponent implements OnInit {
  public todos: ToDoInterface[] = [];
  public openTodo: ToDoInterface;
  public isAddFormOpen: boolean;
  public message: string;
  public messageType: string;

  constructor (private todoService: TodoService) {}

  ngOnInit () {
    this.getTodos();
  }

  private displayMessage (message: string, messageType: string) {
    this.message = message;
    this.messageType = messageType;

    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 1200);
  }

  private getTodos () {
    this.todoService.getAllTodos().subscribe(
      todos => this.todos = todos,
      error => console.error(error)
    );
  }

  public selectTodo (id: number) {
    this.openTodo = this.todos.filter(single => single.id === id).pop();
  }

  public closeTodo () {
    this.openTodo = null;
  }

  public toggleAddTodoForm () {
    if (this.isAddFormOpen) {
      this.isAddFormOpen = false;

      return;
    }
    this.isAddFormOpen = true;
  }

  public addTodo(todo: any) {
    if (!todo.todo) {
      this.displayMessage('Morate popuniti polje To Do.', 'alert-warning');

      return;
    }
    if (!todo.priority) {
      this.displayMessage('Morate selektovati prioritet za dati To Do.', 'alert-warning');

      return;
    }

    this.todoService.addTodo(todo).subscribe(
      data => {
        this.getTodos();
        this.isAddFormOpen = false;
        this.displayMessage('Uspesno ste dodali To Do.', 'alert-success');
      },
      error => this.displayMessage('Doslo je do greske, molimo Vas pokusajte kasnije.', 'alert-danger')
    );
  }

  public deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      data => {
        this.getTodos();
        this.displayMessage('Uspesno ste obrisali Todo', 'alert-success');
      },
      error => this.displayMessage('Doslo je do greske, molimo Vas pokusajte kasnije.', 'alert-danger')
    );
  }

  public updateTodo (todo: any) {
    let id;

    if (!todo.todo && !todo.priority && !todo.done) {
      this.displayMessage('Nikave promene nisu napravljene', 'alert-info');

      return;
    }

    if (this.openTodo) {
      const openTodo = this.openTodo;
      id = openTodo.id;

      if (!todo.done) {
      todo.done = false;
      }
      if (!todo.todo) {
        todo.todo = this.openTodo.todo;
      }
      if (!todo.priority) {
        todo.priority = this.openTodo.priority;
      }
    }else {
      id = todo.id;
    }

    this.todoService.updateTodo(id, todo).subscribe(
      data => {
        this.getTodos();
        this.openTodo = null;
        this.displayMessage('Uspesno ste izmenili To Do', 'alert-success');
      },
      error => this.displayMessage('Doslo je do greske, molimo Vas pokusajte kasnije.', 'alert-danger')
    );
  }

  public doneTodo (todo: ToDoInterface) {
    const newTodo = {
        id: todo.id,
        todo: todo.todo,
        priority: todo.priority,
        done: true
      };

    this.updateTodo(newTodo);
  }

  public undoneTodo (todo: ToDoInterface) {

    const newTodo = {
        id: todo.id,
        todo: todo.todo,
        priority: todo.priority,
        done: false
      };

    this.updateTodo(newTodo);
  }
}

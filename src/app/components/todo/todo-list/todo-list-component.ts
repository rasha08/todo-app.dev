import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoInterface } from '../../../interfaces/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list-component.html',
  styleUrls: ['./todo-list-component.css']
})

export class ToDoListComponent {
  @Input() todos: ToDoInterface[];
  @Output() selectTodo = new EventEmitter();
  @Output() deleteTodo = new EventEmitter();
  @Output() doneTodo = new EventEmitter();
  @Output() undoneTodo = new EventEmitter();
}

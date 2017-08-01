import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoInterface } from '../../../interfaces/todo.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo-component.html',
  styleUrls: ['./edit-todo-component.css']
})

export class EditToDoComponent {
  @Input() openTodo: ToDoInterface;
  @Input() validPriorities: Array<string>;
  @Output() closeTodo = new EventEmitter();
  @Output() updateTodo = new EventEmitter();

  constructor () {}

  onSubmit(f: NgForm) {
    event.preventDefault();
    this.updateTodo.emit(f.value);
  }
}

import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo-component.html',
  styleUrls: ['./add-todo-component.css']
})

export class AddToDoComponent {
  @Output() addTodo = new EventEmitter();

  constructor () {}

  onSubmit(f: NgForm) {
    event.preventDefault();
    this.addTodo.emit(f.value);
  }
}

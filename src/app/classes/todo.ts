import { ToDoInterface } from '../interfaces/todo.interface';

export class ToDo implements ToDoInterface {
  private _id: number;
  private _todo: string;
  private _priority: string;
  private _done: string;

  constructor(newTodo: ToDoInterface) {
    this.id = newTodo.id;
    this.todo = newTodo.todo;
    this.priority = newTodo.priority;
    this.done = newTodo.done;
  }

  public get id () {
    return this._id;
  }

  public set id (id: number) {
    this._id = id;
  }

  public get todo () {
    return this._todo;
  }

  public set todo (todo: string) {
    this._todo = todo;
  }

  public get priority () {
    return this._priority;
  }

  public set priority (priority: string) {
    this._priority = priority;
  }

  public set done (done: string) {
    this._done = done;
  }

  public get done () {
    return this._done;
  }
}

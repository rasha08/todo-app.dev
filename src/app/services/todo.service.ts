import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ToDoInterface } from '../interfaces/todo.interface';
import { ToDo } from '../classes/todo';

@Injectable()
export class TodoService {

  constructor(private http: Http) {}

  public getAllTodos () {
    return this.http.get('http://todo-app-api.dev/todos/')
      .map(this.handleData)
      .catch(this.handleError);
  }

  private handleData (res: Response) {
    const response: ToDoInterface[] = res.json();
    const data: ToDoInterface[] = [];

    for (const todo of response) {
      data.push(new ToDo(todo));
    }

    return data || [];
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);

    return Observable.throw(errMsg);
  }

  public addTodo (todo: Object) {
    const bodyString = JSON.stringify(todo);
    const url = 'http://todo-app-api.dev/todos/';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(url, bodyString, options);
  }

  public deleteTodo (id: number) {
    const url = `http://todo-app-api.dev/todos/${id}`;

    return this.http.delete(url);
  }

  public updateTodo (id: number, todo: ToDoInterface) {
    const bodyString = JSON.stringify(todo);
    const url = `http://todo-app-api.dev/todos/${id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(url, bodyString, options);
  }
}

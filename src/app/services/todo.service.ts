import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../model/Todo.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:3000/todo-list';

  constructor(private http: HttpClient) {}

  getTodoList() {
    return this.http.get<Todo[]>(this.baseUrl + `/tasks`);
  }

  addTodo(todo: string): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl + `/add-task`, {
      task: todo,
      status: '',
      isDelete: false,
    });
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl + `/delete-task`, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.baseUrl + `/update-task`, todo);
  }
}

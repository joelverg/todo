import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/model/Todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  newTodo: string = '';
  todos: string[] = [];
  todoList: Observable<Todo[]> | undefined;
  editedTask = '';
  editingMap: Map<string, boolean> = new Map();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoList = this.getTodoList();
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo).subscribe((data) => {
      this.newTodo = '';
      this.todoList = this.todoService.getTodoList();
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.todoList = this.getTodoList();
    });
  }

  getTodoList(): Observable<Todo[]> {
    return this.todoService.getTodoList();
  }

  editTodo(task: Todo): void {
    this.editingMap.set(task._id, true);
    this.editedTask = task.task;
  }

  isEditing(todoId: string): boolean {
    return this.editingMap.get(todoId) || false;
  }

  saveEdit(todo: Todo): void {
    this.editingMap.delete(todo._id);

    const todoEdited: Todo = {
      task: this.editedTask,
      status: todo.status,
      isDelete: todo.isDelete,
      _id: todo._id,
    };
    this.todoService.updateTodo(todoEdited).subscribe(() => {
      this.todoList = this.todoService.getTodoList();
    });
  }
}

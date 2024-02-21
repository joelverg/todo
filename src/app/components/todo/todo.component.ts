import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newTodo: string = '';
  todos: string[] = [];

  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todos.push(this.newTodo);
      this.newTodo = '';
    }
  }

  deleteTodo(todo: string) {
    this.todos = this.todos.filter(item => item !== todo);
  }

}

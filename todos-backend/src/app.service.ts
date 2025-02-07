import { Injectable } from '@nestjs/common';
import { AppDBService } from './app.dbService';

@Injectable()
export class AppService {
  constructor(private readonly dbService: AppDBService) {}

  //GET
  getTodos() {
    return this.dbService.getTodos();
  }

  //POST
  createTodo(name: string, date: Date) {
    return this.dbService.createTodo(name, date);
  }

  //PATCH
  toggleTodo(id: string) {
    return this.dbService.toggleTodo(id);
  }

  //PATCH EDIT DATE
  editTodo(id: string, name: string, date: Date) {
    return this.dbService.editTodoDate(id, name, date);
  }

  //DELETE
  deleteTodo(id: string) {
    return this.dbService.deleteTodo(id);
  }

  //DELETE ALL
  deleteAllTodos() {
    return this.dbService.deleteAllTodos();
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

interface TodoScheme {
  id: string;
  name: string;
  date: Date;
  is_finished: boolean;
}

export type Todo = {
  id: string;
  name: string;
  date: Date;
  isFinished: boolean;
};

@Injectable()
export class AppDBService {
  constructor(private readonly dbService: DatabaseService) {}

  async getTodos() {
    try {
      const result = await this.dbService.query('SELECT * FROM todos');
      return result.rows.map((todo) => this.mapToTodo(todo));
    } catch (error) {
      throw new HttpException(
        'Error getting todos',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createTodo(name: string, date: Date) {
    try {
      const id = crypto.randomUUID();
      const result = await this.dbService.query(
        'insert into todos (id, name, date) values ($1, $2, $3) RETURNING *',
        [id, name, date]
      );
      return this.mapToTodo(result.rows[0]);
    } catch (error) {
      throw new HttpException(
        'Error creating todo',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async toggleTodo(id: string) {
    try {
      const result = await this.dbService.query(
        'UPDATE todos SET is_finished = NOT is_finished WHERE id = $1 RETURNING *',
        [id]
      );
      if (result.rowCount === 0) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }
      return this.mapToTodo(result.rows[0]);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error toggling todo',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async editTodoDate(id: string, name:string, date: Date) {
    try {
      const result = await this.dbService.query(
        'UPDATE todos SET name = $1, date = $2 WHERE id = $3 RETURNING *',
        [name, date, id]
      );
      if (result.rowCount === 0) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }
      return this.mapToTodo(result.rows[0]);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error editing todo date',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
  }
}

  mapToTodo(todo: TodoScheme): Todo {
    return {
      id: todo.id,
      name: todo.name,
      date: todo.date,
      isFinished: todo.is_finished,
    };
  }

  async deleteTodo(id: string) {
    try {
      const result = await this.dbService.query(
        'DELETE FROM todos WHERE id = $1 RETURNING *',
        [id]
      );
      if (result.rowCount === 0) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }
      return this.mapToTodo(result.rows[0]);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error deleting todo',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteAllTodos() {
    try {
      const result = await this.dbService.query(
        'DELETE FROM todos RETURNING *'
      );
      return result.rows;
    } catch (error) {
      throw new HttpException(
        'Error deleting all todos',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

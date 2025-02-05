import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppDBService {
  constructor(private readonly dbService: DatabaseService) {}

  async getTodos() {
    const result = await this.dbService.query('SELECT * FROM todos');
    return result.rows;
  }

  async createTodo(name: string, date: Date) {
    const id = crypto.randomUUID();
    const result = await this.dbService.query(
      'insert into todos (id, name, date) values ($1, $2, $3) RETURNING *',
      [id, name, date],
    );
    return result.rows[0];
  }

  async toggleTodo(id: string) {
    const result = await this.dbService.query(
      'UPDATE todos SET isfinished = NOT isfinished WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  }

  async deleteTodo(id: string) {
    const result = await this.dbService.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  }

  async deleteAllTodos() {
    const result = await this.dbService.query('DELETE FROM todos RETURNING *');
    return result.rows;
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTodos() {
    return this.appService.getTodos();
  }

  @Post()
  createTodo(@Body() body: { name: string; date: string }) {
    const { name, date } = body;
    const dateInDateFormat = new Date(date);
    return this.appService.createTodo(name, dateInDateFormat);
  }

  @Patch('/:id')
  toggleTodo(@Param('id') id: string) {
    return this.appService.toggleTodo(id);
  }

  @Delete('/all')
  deleteAllTodos() {
    return this.appService.deleteAllTodos();
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string) {
    return this.appService.deleteTodo(id);
  }
}

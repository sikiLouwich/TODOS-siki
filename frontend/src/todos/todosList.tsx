import { useState } from 'react';
import './todos.css';
import TodoInput from './todoInput';
import TodosListPresenter from './todoListPresenter';
import { Todo } from './todo';

function createTodoItem(name: string, date: Date): Todo {
  return {
    id: crypto.randomUUID(),
    name,
    date,
    isFinished: false,
  };
}

function TodosList() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  function handleAddTodo(name: string, date: Date) {
    const newTodo = createTodoItem(name, date);
    setTodos([...todos, newTodo]);
  }

  function handleToggle(todoId: string) {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, isFinished: !todo.isFinished } : todo
      )
    );
  }

  function handleDelete(todoId: string) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  function handleDeleteAll() {
    setTodos([]);
  }

  return (
    <>
      <TodoInput
        handleAddTodo={handleAddTodo}
        handleDeleteAll={handleDeleteAll}
      />
      <div className="listsOfTodos">
        <TodosListPresenter
          todos={todos}
          isFinished={false}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        <TodosListPresenter
          todos={todos}
          isFinished={true}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default TodosList;

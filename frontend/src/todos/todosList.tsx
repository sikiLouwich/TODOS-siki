import { useState, useEffect } from 'react';
import './todos.css';
import TodoInput from './todoInput';
import { Todo } from './todo';
import TodosListPresenter from './todoListPresenter';
import Spinner from './spinner';

const URL = 'http://localhost:3000/api/todos/';
type TodosStates =
  | { status: 'idle' }
  | { status: 'pending'; peviusData: Array<Todo> }
  | { status: 'failed'; error: string }
  | { status: 'loaded'; data: Array<Todo> };

function TodosList() {
  const [todos, setTodos] = useState<TodosStates>({ status: 'idle' });

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Error fetching todos');
      }
      const data = await response.json();
      setTodos({ status: 'loaded', data });
    } catch (error: any) {
      setTodos({ status: 'failed', error: error.message });
    }
  }

  async function handleAddTodo(name: string, date: Date) {
    if (todos.status !== 'loaded') return;
    setTodos({ status: 'pending', peviusData: todos.data });

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date }),
      });
      if (!response.ok) {
        throw new Error('Error adding todos!');
      }
      const newTodo = await response.json();
      setTodos({ status: 'loaded', data: [...todos.data, newTodo] });
    } catch (error: any) {
      setTodos({ status: 'failed', error: error.message });
    }
  }

  async function handleToggle(todoId: string) {
    if (todos.status !== 'loaded') return;
    setTodos({ status: 'pending', peviusData: todos.data });

    try {
      const response = await fetch(`${URL}${todoId}`, { method: 'PATCH' });
      if (!response.ok) {
        throw new Error('Error toggling todos!');
      }
      setTodos({
        status: 'loaded',
        data: todos.data.map((todo) =>
          todo.id === todoId ? { ...todo, isFinished: !todo.isFinished } : todo
        ),
      });
    } catch (error: any) {
      setTodos({ status: 'failed', error: error.message });
    }
  }

  async function handleDelete(todoId: string) {
    if (todos.status !== 'loaded') return;
    setTodos({ status: 'pending', peviusData: todos.data });

    try {
      const response = await fetch(`${URL}${todoId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Error deleting todos!');
      }
      setTodos({
        status: 'loaded',
        data: todos.data.filter((todo) => todo.id !== todoId),
      });
    } catch (error: any) {
      setTodos({ status: 'failed', error: error.message });
    }
  }

  async function handleDeleteAll() {
    if (todos.status !== 'loaded') return;
    setTodos({ status: 'pending', peviusData: todos.data });

    try {
      const response = await fetch(`${URL}/all`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Error deleting all todos!');
      }
      setTodos({ status: 'loaded', data: [] });
    } catch (error: any) {
      setTodos({ status: 'failed', error: error.message });
    }
  }

  switch (todos.status) {
    case 'idle':
      return null;
    case 'failed':
      return <div>Error: {todos.error}</div>;
    case 'loaded':
      return (
        <TodosConteiner
          isPending={false}
          todos={todos.data}
          handleAddTodo={handleAddTodo}
          handleDeleteAll={handleDeleteAll}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
        />
      );
    case 'pending':
      return (
        <TodosConteiner
          isPending={true}
          todos={todos.peviusData}
          handleAddTodo={handleAddTodo}
          handleDeleteAll={handleDeleteAll}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
        />
      );
  }
}

interface TodosConteinerProps {
  isPending: boolean;
  todos: Todo[];
  handleAddTodo: (name: string, date: Date) => void;
  handleDeleteAll: () => void;
  handleDelete: (todoId: string) => void;
  handleToggle: (todoId: string) => void;
}

function TodosConteiner(prpos: TodosConteinerProps) {
  return (
    <>
      {prpos.isPending && <Spinner />}
      <div
        style={{
          pointerEvents: prpos.isPending ? 'none' : 'auto',
          opacity: prpos.isPending ? 0.5 : 1,
        }}
        onKeyDown={event => {
          if(prpos.isPending){
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        <TodoInput
          handleAddTodo={prpos.handleAddTodo}
          handleDeleteAll={prpos.handleDeleteAll}
        />
        <div className="listsOfTodos">
          <TodosListPresenter
            todos={prpos.todos}
            isFinished={false}
            onToggle={prpos.handleToggle}
            onDelete={prpos.handleDelete}
          />
          <TodosListPresenter
            todos={prpos.todos}
            isFinished={true}
            onToggle={prpos.handleToggle}
            onDelete={prpos.handleDelete}
          />
        </div>
      </div>
    </>
  );
}

export default TodosList;

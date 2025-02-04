import { useState, useEffect } from 'react';
import './todos.css';
import TodoInput from './todoInput';
import { Todo } from './todo';
import TodosListPresenter from './todoListPresenter';
import Spinner from './spinner';

const MESSAGE_POST = ", please try again or check your network connection"
const URL = '/todos/';

type TodosStates =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'failed'; error: string }
  | { status: 'loaded'; data: Array<Todo> };

function createDummyTodo(name: string, date: Date): Todo {
  return {
    id: crypto.randomUUID(),
    isfinished: false,
    name: name,
    date: date,
  };
}

function TodosList() {
  const [todos, setTodos] = useState<TodosStates>({ status: 'idle' });

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    setTodos({ status: 'pending' });
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Failed to fetching todos');
      }
      const data = await response.json();
      setTodos({ status: 'loaded', data });
    } catch (error: any) {
      setTodos({ status: 'failed', error: error.message });
    }
  }

  async function handleAddTodo(name: string, date: Date) {
    if (todos.status !== 'loaded') {
      return;
    }
    const dummyTodo = createDummyTodo(name, date);
    setTodos({ status: 'loaded', data: [...todos.data, dummyTodo] });

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date }),
      });
      if (!response.ok) {
        throw new Error(`Error adding todos${MESSAGE_POST}`);
      }
      const newTodo = await response.json();

      setTodos((currentTodos) => {
        if (currentTodos.status !== 'loaded') {
          return currentTodos;
        }
        return {
          status: 'loaded',
          data: currentTodos.data.map((todo) =>
            todo.id === dummyTodo.id ? { ...todo, id: newTodo.id } : todo
          ),
        };
      });
    } catch (error: any) {
      setTodos((currentTodos) => {
        if (currentTodos.status !== 'loaded') {
          return currentTodos;
        }
        return {
          status: 'loaded',
          data: currentTodos.data.filter((todo) => todo.id !== dummyTodo.id),
        };
      });
      alert(error.message)
    }
  }

  async function handleToggle(todoId: string) {
    if (todos.status !== 'loaded') {
      return;
    }
    setTodos({
      status: 'loaded',
      data: todos.data.map((todo) =>
        todo.id === todoId ? { ...todo, isfinished: !todo.isfinished } : todo
      ),
    });
    try {
      const response = await fetch(`${URL}${todoId}`, { method: 'PATCH' });
      if (!response.ok) {
        throw new Error(`Error toggling todos! ${MESSAGE_POST}`);
      }
    } catch (error: any) {
      getTodos();
      alert(error.message)
    }
  }

  async function handleDelete(todoId: string) {
    if (todos.status !== 'loaded') return;
    const todoBackup = todos.data.find((todo) => todo.id === todoId);

    setTodos({
      status: 'loaded',
      data: todos.data.filter((todo) => todo.id !== todoId),
    });

    try {
      const response = await fetch(`${URL}${todoId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Error deleting todos!');
      }
    } catch (error: any) {
      setTodos((currentTodos) => {
        if (currentTodos.status !== 'loaded') return currentTodos;
        return {
          status: 'loaded',
          data: [...currentTodos.data, todoBackup] as Todo[],
        };
      });
      alert(error.message)
    }
  }

  async function handleDeleteAll() {
    if (todos.status !== 'loaded') return;
    const todosBackup = [...todos.data];
    setTodos({ status: 'loaded', data: [] });
    try {
      const response = await fetch(`${URL}all`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Error deleting all todos!${MESSAGE_POST}`);
      }
    } catch (error: any) {
      setTodos((currentTodos) => {
        if (currentTodos.status !== 'loaded') {
          return currentTodos;
        }
        return {
          status: 'loaded',
          data: todosBackup,
        };
      });
      alert(error.message)
    }
  }

  switch (todos.status) {
    case 'idle':
      return null;
    case 'failed':
      return <div>Error: {todos.error}</div>;
    case 'loaded':
      return (
        <BodyPresenter
          todos={todos.data}
          handleAddTodo={handleAddTodo}
          handleDeleteAll={handleDeleteAll}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      );
    case 'pending':
      return <Spinner />;
  }
}

interface TodosContainer {
  todos: Todo[];
  handleAddTodo: (name: string, date: Date) => void;
  handleDeleteAll: () => void;
  handleToggle: (todoId: string) => void;
  handleDelete: (todoId: string) => void;
}

function BodyPresenter(props: TodosContainer) {
  return (
    <>
      <div className="todosContainer">
        <TodoInput
          handleAddTodo={props.handleAddTodo}
          handleDeleteAll={props.handleDeleteAll}
        />
        <div className="listsOfTodos">
          <TodosListPresenter
            todos={props.todos}
            isfinished={false}
            onToggle={props.handleToggle}
            onDelete={props.handleDelete}
          />
          <TodosListPresenter
            todos={props.todos}
            isfinished={true}
            onToggle={props.handleToggle}
            onDelete={props.handleDelete}
          />
        </div>
      </div>
    </>
  );
}

export default TodosList;

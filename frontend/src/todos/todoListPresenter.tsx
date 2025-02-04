import TodoPresenter from './todoPresenter';
import { Todo } from './todo';

export interface TodosListProps {
  todos: Todo[];
  isfinished: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodosListPresenter(props: TodosListProps) {
  return (
    <div className={props.isfinished ? 'finished' : 'notFinished'}>
      <h2>{props.isfinished ? 'Finished Tasks' : 'Not Finished Tasks'}</h2>
      <ul>
        {props.todos
          .filter((todo) => todo.isfinished === props.isfinished)
          .map((todo) => (
            <TodoPresenter
              key={todo.id}
              todo={todo}
              onToggle={() => props.onToggle(todo.id)}
              onDelete={() => props.onDelete(todo.id)}
            />
          ))}
      </ul>
    </div>
  );
}

export default TodosListPresenter;

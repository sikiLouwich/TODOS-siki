import TodoPresenter from './todoPresenter';
import { Todo } from './todo';

export interface TodosListProps {
  todos: Todo[];
  isFinished: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodosListPresenter(props: TodosListProps) {
  const onToggle = props.onToggle;
  const onDelete = props.onDelete;
  return (
    <div className={props.isFinished ? 'finished' : 'notFinished'}>
      <h2>{props.isFinished ? 'Finished Tasks' : 'Not Finished Tasks'}</h2>
      <ul>
        {props.todos
          .filter((todo) => todo.isFinished === props.isFinished)
          .map((todo) => (
            <TodoPresenter
              key={todo.id}
              todo={todo}
              onToggle={() => onToggle(todo.id)}
              onDelete={() => onDelete(todo.id)}
            />
          ))}
      </ul>
    </div>
  );
}

export default TodosListPresenter;

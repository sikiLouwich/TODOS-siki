import { Todo } from './todo';

function formatDate(date: Date): string {
  return new Date(date).toISOString().split('T')[0];
}
function TodoPresenter({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <li>
      <div className="todoDetails">
        <strong>{todo.name}</strong>
      </div>
      <div className="todoActions">
        {formatDate(todo.date)}
        <button
          className={todo.isfinished ? 'finishedButton' : 'unfinishedButton'}
          onClick={onToggle}
        >
          {todo.isfinished ? 'unfinished' : 'finished'}
        </button>
        <button className="deleteOneTodos" onClick={onDelete}>
          delete
        </button>
      </div>
    </li>
  );
}

export default TodoPresenter;

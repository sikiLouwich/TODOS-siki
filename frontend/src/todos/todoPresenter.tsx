import { Todo } from './todo';

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
        {todo.date.toDateString()}
        <button
          className={todo.isFinished ? 'finishedButton' : 'unfinishedButton'}
          onClick={onToggle}
        >
          {todo.isFinished ? 'unfinished' : 'finished'}
        </button>
        <button className="deleteOneTodos" onClick={onDelete}>
          delete
        </button>
      </div>
    </li>
  );
}

export default TodoPresenter;

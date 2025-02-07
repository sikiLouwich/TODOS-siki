import { Todo } from './todo';
import { useState } from 'react';
import TodoEditor from './todoEditor';

function formatDate(date: Date): string {
  return new Date(date).toISOString().split('T')[0];
}
function TodoPresenter({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (todoId: string, newName: string, newDate: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const handleSave = (newName: string, newDate: string) => {
    onEdit(todo.id, newName, newDate);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li>
        <TodoEditor
          todo={todo}
          handleAddTodo={handleSave}
          onSaved={() => {
            setIsEditing(false);
          }}
        />
      </li>
    );
  }

  return (
    <li>
      <div className="todoDetails">
        <strong>{todo.name}</strong>
      </div>
      <div className="todoActions">
        {formatDate(todo.date)}
        <button
          className={todo.isFinished ? 'finishedButton' : 'unfinishedButton'}
          onClick={onToggle}
        >
          {todo.isFinished ? 'unfinished' : 'finished'}
        </button>
        <button className="deleteOneTodos" onClick={onDelete}>
          delete
        </button>
        <>
          <button className="editButton" onClick={() => setIsEditing(true)}>
            edit
          </button>
        </>
      </div>
    </li>
  );
}

export default TodoPresenter;

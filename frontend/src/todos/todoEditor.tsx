import { useState, useEffect } from 'react';
import { Todo } from './todo';

interface TodoInputProps {
  todo: Todo;
  handleAddTodo: (name: string, date: string) => void;
  onSaved: () => void;
}

function TodoEditor(props: TodoInputProps) {
  const [newMissionName, setNewMissionName] = useState<string>(props.todo.name);
  const [newMissionDate, setNewMissionDate] = useState<string>("");

  useEffect(() => {
    const date = new Date(props.todo.date);
    const formatDate = date.toISOString().split('T')[0];
    setNewMissionDate(formatDate);
  }, [props.todo.date, props.todo.name]);

  function handleEdit() {
    if (!newMissionName.trim()) {
      alert("Please provide mission name!\n(empty name isn't allowed)");
      return;
    }
    if (!newMissionDate) {
      alert('Please provide mission date!');
      return;
    }
    props.handleAddTodo(newMissionName, newMissionDate);
  }

  return (
    <div className="editor" id="insert-mission-editor">
      <input
        value={newMissionName}
        type="text"
        onChange={(e) => setNewMissionName(e.target.value)}
      />
      <input
        value={newMissionDate}
        type="date"
        onChange={(e) => {
          setNewMissionDate(e.target.value);
        }}
      />
      <button id="saveButton" onClick={handleEdit}>
        save
      </button>
    </div>
  );
}

export default TodoEditor;

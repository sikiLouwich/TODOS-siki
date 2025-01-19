import { useState } from 'react';

interface TodoInputProps {
  handleAddTodo: (name: string, date: Date) => void;
  handleDeleteAll: () => void;
}

function TodoInput(props: TodoInputProps) {
  const [newMissionName, setNewMissionName] = useState<string>('');
  const [newMissionDate, setNewMissionDate] = useState<string>('');

  function handleAddMission() {
    if (!newMissionName.trim()) {
      alert("Please provide mission name!\n(empty name isn't allowed)");
      return;
    }
    props.handleAddTodo(
      newMissionName,
      newMissionDate ? new Date(newMissionDate) : new Date()
    );

    setNewMissionName('');
    setNewMissionDate('');
  }

  return (
    <div className="todosManager">
      <h1>Todo's List</h1>
      <div id="insert-mission">
        <input
          value={newMissionName}
          type="text"
          placeholder="Mission Name"
          onChange={(e) => setNewMissionName(e.target.value)}
        />
        <input
          value={newMissionDate}
          type="date"
          onChange={(e) => setNewMissionDate(e.target.value)}
        />
        <button id="addMission" onClick={handleAddMission}>
          Add New Mission
        </button>
        <button onClick={props.handleDeleteAll}>Delete All Todos</button>
      </div>
    </div>
  );
}

export default TodoInput;

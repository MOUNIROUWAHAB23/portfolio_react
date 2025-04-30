import React, { useState } from 'react';

export default function  TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length < 3) {
      alert("La tâche doit contenir au moins 3 caractères.");
      return;
    }
    setTasks([...tasks, inputValue]);
    setInputValue('');
  };

  const handleDelete = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const handleEditSubmit = (index) => {
    if (editValue.trim().length < 3) {
      alert("La tâche doit contenir au moins 3 caractères.");
      return;
    }
    const newTasks = [...tasks];
    newTasks[index] = editValue;
    setTasks(newTasks);
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <div>
      <h1>Ma TODO List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une tâche..."
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleEditSubmit(index)}>Valider</button>
                <button onClick={() => setEditIndex(null)}>Annuler</button>
              </>
            ) : (
              <>
                {task}
                <button onClick={() => handleEdit(index)}>Modifier</button>
                <button onClick={() => handleDelete(index)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}



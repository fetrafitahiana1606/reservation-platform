import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ name: '', description: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Task List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Task name"
          value={newTask.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Task description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <p>{task.isFinished ? 'Completed' : 'Not Completed'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <TaskList />
    </div>
  );
};

export default App;
// App.js

import React, { useState, useEffect } from 'react';
import './App.css'; // Import the updated CSS

function App() {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [newTask, setNewTask] = useState(''); // State to store new task input
  const [isEditing, setIsEditing] = useState(false); // State to track if we're editing a task
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null); // State to track the index of the task being edited

  // Load tasks from localStorage when the app initializes
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Function to start editing a task
  const editTask = (index) => {
    setNewTask(tasks[index].text); // Set input to the current task text
    setIsEditing(true); // Set editing mode to true
    setCurrentTaskIndex(index); // Set the index of the current task being edited
  };

  // Function to update a task
  const updateTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = tasks.map((task, index) =>
        index === currentTaskIndex ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setNewTask('');
      setIsEditing(false);
      setCurrentTaskIndex(null);
    }
  };
  // Function to delete a completed task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        {isEditing ? (
          <button onClick={updateTask}>Update</button>
        ) : (
          <button onClick={addTask}>Add</button>
        )}
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? 'completed' : ''}
          >
            {task.text}
            <div>
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

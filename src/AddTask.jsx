import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './App.css';

function AddTask({ user, onTaskAdded }) {
  const [taskText, setTaskText] = useState('');

  // Function that runs when the user clicks "Add Task"
  const handleAddTask = async () => {
    if (taskText.trim() === '') return;

    try {
      await addDoc(collection(db, `users/${user.uid}/tasks`), {
        description: taskText,
        isCompleted: false
      });

      setTaskText(''); // Clear input
      onTaskAdded();   // Notify parent to refresh task list
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="task-input-container" style={{
     display: 'flex',
     alignItems: 'center',
     marginBottom: '1rem',
     flexWrap: 'wrap'
    }}>
     <input
      type="text"
      value={taskText}
      onChange={e => setTaskText(e.target.value)}
      placeholder="Enter new task..."
     />
     <button onClick={handleAddTask}>➕ Add Task</button>
    </div>
  );
}

export default AddTask;


import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import AddTask from './AddTask';
import { doc, updateDoc , deleteDoc } from 'firebase/firestore';

function TaskList({ user}) {
  if (!user) {
    return <p>Loading user...</p>;
  }

  const taskRef = collection(db, `users/${user.uid}/tasks`);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from Firebase
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${user.uid}/tasks`));
      const taskList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks(); // Runs on first load
  }, []);

  const handleToggle = async (id, currentStatus) => {
   try {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const taskRef = doc(db, `users/${user.uid}/tasks`, id);
    await updateDoc(taskRef, {
      isCompleted: !currentStatus
    });
    fetchTasks(); // Refresh the task list
  } catch (error) {
    console.error('Error updating task:', error);
  }
 };

  const handleDelete = async (id) => {
  try {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const taskRef = doc(db, `users/${user.uid}/tasks`, id);
    await deleteDoc(taskRef); // remove from Firestore
    fetchTasks(); // refresh the list
  } catch (error) {
    console.error('Error deleting task:', error);
  }
 };

  return (
    <div>
      <AddTask user={user} onTaskAdded={fetchTasks} />
      <h2
  style={{
    color: '#3f3c3b',
    textAlign: 'center',
    fontSize: '1.5rem',
    marginBottom: '1rem'
  }}
>
  All Tasks
</h2>
      {loading ? (
        <p style={{ color: 'black', fontStyle: 'italic', fontSize: '1.1rem' }}>
          ⏳ Loading tasks...
        </p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} style={{
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: '8px',
              background: '#f9f9f9',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
               <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggle(task.id, task.isCompleted)}
                style={{ marginRight: '10px', transform: 'scale(1.2)' }}
               />
               <span style={{
                textDecoration: task.isCompleted ? 'line-through' : 'none',
                color: task.isCompleted ? '#aaa' : '#333',
                fontSize: '1rem'
               }}>
                {task.description}
               </span>
              </div>

              <button onClick={() => handleDelete(task.id)} style={{ backgroundColor: '#92c6f2', marginLeft: '10px', border: '1px solid black' }}>
               🗑️
              </button>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;

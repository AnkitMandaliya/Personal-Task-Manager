import { useEffect, useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(stored);
  }, []);

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    localStorage.setItem('tasks', JSON.stringify(updated));
    setTasks(updated);
  };

  return (
    <ul>
      {tasks.map((task, i) => (
        <li key={i}>
          <strong>{task.title}</strong> — {task.date} — {task.priority}
          <button onClick={() => deleteTask(i)} style={{ marginLeft: '10px' }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

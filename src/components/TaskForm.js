import { useState } from 'react';

function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    date: '',
    priority: 'Medium',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('tasks') || '[]');
    localStorage.setItem('tasks', JSON.stringify([...existing, task]));
    setTask({ title: '', date: '', priority: 'Medium' });
    alert("Task added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <input
        type="date"
        value={task.date}
        onChange={(e) => setTask({ ...task, date: e.target.value })}
        required
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;

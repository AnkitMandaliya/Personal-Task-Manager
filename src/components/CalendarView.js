import { useEffect, useState } from 'react';

function CalendarView() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(stored);
  }, []);

  const grouped = tasks.reduce((acc, task) => {
    acc[task.date] = acc[task.date] || [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(grouped).map((date) => (
        <div key={date}>
          <h3>{date}</h3>
          <ul>
            {grouped[date].map((task, i) => (
              <li key={i}>{task.title} ({task.priority})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CalendarView;

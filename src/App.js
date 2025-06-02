import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import moment from "moment";
import { openDB } from "idb";

const DB_NAME = "taskManagerDB";
const STORE_NAME = "tasks";

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

async function getAllTasks() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

async function saveTask(task) {
  const db = await getDB();
  await db.put(STORE_NAME, task);
}

async function deleteTaskById(id) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

function Home() {
  return (
    <div className="page-container">
      <h2>Welcome to the Task Manager App</h2>
      <p>Select Tasks or Schedule from the menu.</p>
    </div>
  );
}

function Tasks({ tasks, setTasks }) {
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [showAddTaskForm, setShowAddTaskForm] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newDate, setNewDate] = React.useState("");

  function handleTaskClick(id) {
    setSelectedTask(selectedTask === id ? null : id);
  }

  async function handleAddTaskSubmit(e) {
    e.preventDefault();
    if (!newTitle || !newDate) return alert("Please fill title and date");

    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      title: newTitle,
      date: newDate,
      details: "No details yet.",
    };

    await saveTask(newTask);
    setTasks([...tasks, newTask]);
    setNewTitle("");
    setNewDate("");
    setShowAddTaskForm(false);
  }

  async function handleDeleteTask(id) {
    if (window.confirm("Delete this task?")) {
      await deleteTaskById(id);
      setTasks(tasks.filter((task) => task.id !== id));
      if (selectedTask === id) setSelectedTask(null);
    }
  }

  return (
    <div className="page-container">
      <button
        className="show-add-task-btn"
        onClick={() => setShowAddTaskForm(!showAddTaskForm)}
      >
        {showAddTaskForm ? "Cancel" : "Add New Task"}
      </button>

      {showAddTaskForm && (
        <div className="add-task-form-container">
          <form onSubmit={handleAddTaskSubmit}>
            <input
              type="text"
              placeholder="Task Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
              min={moment().format("YYYY-MM-DD")}
            />
            <button type="submit">Add Task</button>
          </form>
        </div>
      )}

      <h1>Task Manager</h1>

      <ul>
        {tasks.map((task) => {
          const isExpanded = selectedTask === task.id;
          return (
            <li
              key={task.id}
              className={isExpanded ? "task-expanded" : ""}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="task-header">
                <div>
                  <div className="task-title">{task.title}</div>
                  <div className="task-date">Due: {task.date}</div>
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.id);
                  }}
                >
                  Delete
                </button>
              </div>

              {isExpanded && <div className="task-details">{task.details}</div>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Schedule({ tasks }) {
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="page-container">
      <h1>Schedule</h1>
      {sortedTasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul className="schedule-list">
          {sortedTasks.map((task) => (
            <li key={task.id} className="schedule-item">
              <strong>{task.title}</strong> — <em>{task.date}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const savedTasks = await getAllTasks();
      setTasks(savedTasks);
    }
    loadTasks();
  }, []);

  return (
    <Router>
      <div id="root">
        <nav className="nav-bar">
          <Link to="/">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/schedule">Schedule</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
          <Route path="/schedule" element={<Schedule tasks={tasks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

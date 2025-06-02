
# React Task Manager App

This is a simple Task Manager web app built with React. It allows users to add, view, and delete tasks with due dates. Tasks are persisted using IndexedDB via the `idb` library, so data remains available even if the browser is refreshed or closed.

## Features
- Add new tasks with a title and due date
- View a list of tasks, expandable to see details
- Delete tasks
- Tasks data is stored in browser IndexedDB (no backend or localStorage used)
- Navigation between Home, Tasks, and Schedule pages using React Router
- Schedule page displays all tasks sorted by due date

## Technologies Used
- React
- React Router DOM
- IndexedDB with `idb` library for persistent storage
- Moment.js for date handling
- CSS for styling and responsive UI

## Installation & Usage
1. Clone the repo:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd task-manager
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000`

## File Structure
- `App.js` - Main React component with routing and task management logic
- `App.css` - CSS styles for UI design
- Other standard React project files

## How It Works
- Tasks are loaded from IndexedDB on app start
- When adding or deleting a task, the change is saved to IndexedDB
- The UI updates reactively to show current tasks
- Uses React Router for multiple pages without reload

## Notes
- The app works entirely on the client side with no backend
- Uses IndexedDB instead of localStorage for more robust data storage
---
Created by Ankit Mandaliya


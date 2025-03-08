Advanced React Todo Application

Overview

This is an advanced Todo application built using React.js and JavaScript. The application allows users to add, edit, delete, and mark tasks as complete while providing additional features like task prioritization, filtering, dark mode, drag-and-drop reordering, and a pie chart visualization of task distribution.
<img width="1280" alt="Screenshot 2025-03-09 at 12 19 32 AM" src="https://github.com/user-attachments/assets/e5fb932c-6f12-4fb3-8310-d26275efd44b" />

Features

✅ Add Task: Users can input tasks and add them via a button or Enter key.
✅ Edit Task: Modify existing tasks with a simple click.
✅ Delete Task: Remove unwanted tasks easily.
✅ Mark as Complete: Toggle task completion.
✅ Task Prioritization: Set priority levels (High, Medium, Low) with color coding.
✅ Drag-and-Drop: Reorder tasks easily using drag-and-drop.
✅ Filtering: View tasks based on status - All, Active, or Completed.
✅ Persistent Storage: Uses local storage to save tasks and theme preferences.
✅ Dark Mode Support: Users can toggle between light and dark mode.
✅ Graphical Representation: Pie charts display task status and priority distribution.
✅ Responsive UI: Fully optimized for all screen sizes.

Technologies Used

React.js (Functional Components & Hooks)

JavaScript

Zustand for State Management

Tailwind CSS for Styling

React Beautiful DnD for Drag-and-Drop

Recharts for Graph Visualization

Local Storage for Data Persistence

Installation

Clone the repository:

git clone https://github.com/AmriteshRaj123/advance-TODO-App.git
cd todo-app

Install dependencies:

npm install

Start the development server:

npm run dev

Open http://localhost:5173 in your browser.

Project Structure

📂 todo-app
 ├── 📂 src
 │   ├── 📂 components
 │   │   ├── Header.jsx
 │   │   ├── Sidebar.jsx
 │   │   ├── TodoItem.jsx
 │   │   ├── TodoList.jsx
 │   │   ├── TaskChart.jsx
 │   ├── 📂 store
 │   │   ├── todoStore.js
 │   │   ├── themeStore.js
 │   ├── App.jsx
 │   ├── index.js
 ├── 📂 public
 ├── package.json
 ├── tailwind.config.js
 ├── vite.config.js
 └── README.md

Usage

Add a Task: Type a task and press Enter or click the "Add" button.

Edit a Task: Click on a task to edit its content.

Delete a Task: Click the trash icon next to a task to delete it.

Mark as Complete: Click the checkbox to mark a task as done.

Set Priority: Select High, Medium, or Low priority while adding a task.

Reorder Tasks: Drag and drop tasks to change their order.

Filter Tasks: Use the filter options (All, Active, Completed) to view specific tasks.

Toggle Dark Mode: Click the dark mode button in the header.

View Charts: Check the pie chart to analyze task distribution.

Deployment

To deploy the application:

Build the project:

npm run build





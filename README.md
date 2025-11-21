# Task Management Application

A modern, responsive task management application built with React that allows users to create, edit, update, and delete tasks. The app features a beautiful UI with offline support - when the JSON server is unavailable, tasks are managed locally with full CRUD functionality.

## 🎯 Features

- ✅ **Create Tasks** - Add new tasks with name and description
- ✏️ **Edit Tasks** - Modify task name and description
- ✓ **Mark as Complete** - Toggle task completion status with checkbox
- 🗑️ **Delete Tasks** - Remove tasks from your list
- 📊 **Task Statistics** - View total tasks and completed tasks count
- 🔌 **Offline Support** - Full functionality when JSON server is unavailable
- 🎨 **Modern UI** - Clean and responsive design with Tailwind CSS

## 🛠️ Tech Stack

- **React 19.1.1** - UI library with hooks and Context API
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework for styling
- **JSON Server 1.0.0-beta.3** - Mock REST API for task data storage
- **React DOM 19.1.1** - React package for web

## 📋 Project Structure

```
TaskManagement/
├── src/
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── Contex.jsx           # Context API setup with task management logic
│   ├── Header.jsx           # Header component with add task form
│   ├── Tasks.jsx            # Tasks display and task item component
│   ├── main.jsx             # Entry point
│   └── assets/              # Static assets
├── public/
│   └── Tasks.json           # JSON data file for json-server
├── package.json             # Project dependencies and scripts
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) and **npm** installed on your system
- Git for cloning the repository

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/TaskManagement.git
   cd TaskManagement
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

The application requires two separate commands to run in different terminals:

#### Terminal 1: Start the JSON Server

```bash
npm run server-start
```

This starts the JSON server on `http://localhost:4000` which serves your tasks data from `public/Tasks.json`

#### Terminal 2: Start the Development Server

```bash
npm run dev
```

This starts the Vite development server. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Lint Code

To check code quality:

```bash
npm run lint
```

## 💡 How It Works

### Online Mode (With JSON Server)

When the JSON server is running on port 4000:

- All tasks are persisted to `public/Tasks.json`
- Changes are immediately synced to the server
- Refresh the page and your tasks will still be there

### Offline Mode (Without JSON Server)

When the JSON server is not available:

- The app automatically switches to offline mode
- Tasks are managed entirely in React state (in-memory)
- A warning message displays: "⚠️ Working offline - changes are saved locally"
- All CRUD operations work normally but are not persisted to disk
- Tasks will be reset on page refresh

### Context API Structure

The `Contex.jsx` file manages:

- **State Management**: Manages tasks, completion count, and server availability
- **Local Methods**:
  - `addTaskLocally()` - Add tasks when offline
  - `updateTaskLocally()` - Update tasks when offline
  - `deleteTaskLocally()` - Delete tasks when offline
- **Automatic Fallback**: Uses fallback tasks if server is unavailable on initial load

## 📝 Available npm Scripts

| Command                | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot reload |
| `npm run build`        | Create optimized production build        |
| `npm run server-start` | Start JSON server on port 4000           |
| `npm run preview`      | Preview production build locally         |
| `npm run lint`         | Check code quality with ESLint           |

## 🔧 Configuration Files

### `package.json`

Contains all project dependencies, versions, and npm scripts.

### `vite.config.js`

Vite configuration for React with HMR settings.

### `eslint.config.js`

ESLint configuration for code quality.

### `public/Tasks.json`

Initial tasks database (only used with JSON server).

## 📱 Component Overview

### `Contex.jsx` (Context Provider)

- Provides global state for tasks
- Handles data fetching from JSON server
- Manages offline state and local updates
- Calculates task completion statistics

### `Header.jsx`

- Displays the application header
- Contains the "Add Task" button and modal form
- Communicates with context to add tasks

### `Tasks.jsx`

- Displays list of all tasks
- Shows task statistics (total and completed count)
- Each task component handles edit, delete, and completion toggle
- Displays offline mode warning

## 🌐 API Endpoints

When JSON server is running, the app uses these endpoints:

- `GET http://localhost:4000/Tasks` - Fetch all tasks
- `POST http://localhost:4000/Tasks` - Create a new task
- `PUT http://localhost:4000/Tasks/:id` - Update a task
- `DELETE http://localhost:4000/Tasks/:id` - Delete a task

## ⚠️ Troubleshooting

### JSON Server Not Starting

- Make sure port 4000 is not already in use
- Check if Node.js is properly installed: `node --version`

### Tasks Not Persisting

- Ensure JSON server is running: `npm run server-start`
- Check browser console for error messages
- Verify `public/Tasks.json` file exists

### App Not Loading

- Clear browser cache
- Check if development server is running on correct port
- Ensure all dependencies are installed: `npm install`

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a Task Management learning project demonstrating React hooks, Context API, and integration with JSON Server.

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

---

**Happy Task Managing!** 🎉

import { Children, createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
export const ctx = createContext();

function Contex({ children }) {
  const [upd, setupd] = useState(1);
  const [task, settask] = useState([]);
  const [done, setDone] = useState(0);
  const [isServerAvailable, setIsServerAvailable] = useState(true);

  // Fallback task list when JSON server doesn't work
  const fallbackTasks = [
    {
      id: "1",
      name: "Learn React",
      description: "Study React hooks and context API",
      done: false,
    },
    {
      id: "2",
      name: "Build Task Manager",
      description: "Create a functional task management app",
      done: false,
    },
    {
      id: "3",
      name: "Setup JSON Server",
      description: "Configure and run JSON server on port 4000",
      done: false,
    },
    {
      id: "4",
      name: "Add Styling",
      description: "Apply Tailwind CSS for better UI",
      done: true,
    },
    {
      id: "5",
      name: "Test Application",
      description: "Test all CRUD operations",
      done: false,
    },
  ];

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await fetch("http://localhost:4000/Tasks", {
          method: "GET",
        });
        const taskData = await response.json();
        console.log("Tasks fetched from server:", taskData);
        settask(taskData);
        setIsServerAvailable(true);
      } catch (error) {
        console.log("JSON Server not available, using fallback tasks", error);
        settask(fallbackTasks);
        setIsServerAvailable(false);
      }
    }
    getTasks();
  }, [upd]);

  useEffect(() => {
    // Calculate the number of tasks that are done in one go
    const doneCount = task.filter((item) => item.done).length;
    setDone(doneCount);
  }, [task, upd]);

  // Add task locally when server is unavailable
  const addTaskLocally = (taskName, taskDesc) => {
    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      description: taskDesc,
      done: false,
    };
    fallbackTasks.push(newTask)
    settask([...task, newTask]);

  };

  // Update task locally when server is unavailable
  const updateTaskLocally = (taskId, updates) => {
    settask(
      task.map((item) => (item.id === taskId ? { ...item, ...updates } : item))
    );
  };

  // Delete task locally when server is unavailable
  const deleteTaskLocally = (taskId) => {
    settask(task.filter((item) => item.id !== taskId));
  };

  return (
    <ctx.Provider
      value={{
        update: setupd,
        task: task,
        done: done,
        isServerAvailable: isServerAvailable,
        addTaskLocally: addTaskLocally,
        updateTaskLocally: updateTaskLocally,
        deleteTaskLocally: deleteTaskLocally,
      }}
    >
      {children}
    </ctx.Provider>
  );
}

export default Contex;

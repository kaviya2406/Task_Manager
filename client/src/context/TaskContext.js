import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState([]);

  const addTask = (title, deadline) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        deadline
      }
    ]);
  };

  const updateTask = (id, title, deadline) => {
    setTasks(
      tasks.map(t =>
        t.id === id
          ? { ...t, title, deadline }
          : t
      )
    );
  };

  // ✅ ADD THIS FUNCTION
  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    // ✅ add removeTask here also
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => useContext(TaskContext);

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

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => useContext(TaskContext);

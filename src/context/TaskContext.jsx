import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])

  const storageKey = user ? `tf_tasks_${user.id}` : null

  useEffect(() => {
    if (!storageKey) { setTasks([]); return }
    const stored = localStorage.getItem(storageKey)
    setTasks(stored ? JSON.parse(stored) : [])
  }, [storageKey])

  const persist = useCallback((updated) => {
    setTasks(updated)
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(updated))
  }, [storageKey])

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
      remindedAt: null,
    }
    persist([...tasks, newTask])
    return newTask
  }

  const updateTask = (id, updates) => {
    persist(tasks.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const deleteTask = (id) => {
    persist(tasks.filter(t => t.id !== id))
  }

  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    updateTask(id, { completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null })
  }

  const removeCompleted = () => {
    persist(tasks.filter(t => !t.completed))
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return new Date(a.dueDate) - new Date(b.dueDate)
  })

  return (
    <TaskContext.Provider value={{ tasks: sortedTasks, rawTasks: tasks, addTask, updateTask, deleteTask, toggleComplete, removeCompleted, persist }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => useContext(TaskContext)

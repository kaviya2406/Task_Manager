import { useEffect, useRef } from 'react'
import { useTasks } from '../context/TaskContext'

export function useReminder(onRemind) {
  const { tasks, rawTasks, persist } = useTasks()
  const tasksRef = useRef(tasks)

  useEffect(() => { tasksRef.current = tasks }, [tasks])

  useEffect(() => {
    const check = () => {
      const now = new Date()
      const upcoming = tasksRef.current.filter(t => {
        if (t.completed || !t.dueDate || t.remindedAt) return false
        const due = new Date(t.dueDate)
        const diffMs = due - now
        return diffMs > 0 && diffMs <= 10 * 60 * 1000 // within 10 minutes
      })
      upcoming.forEach(t => {
        const due = new Date(t.dueDate)
        const minsLeft = Math.ceil((due - now) / 60000)
        onRemind(t, minsLeft)
        // Mark as reminded
        const updated = tasksRef.current.map(x => x.id === t.id ? { ...x, remindedAt: now.toISOString() } : x)
        persist(updated)
      })
    }
    check()
    const interval = setInterval(check, 60 * 1000)
    return () => clearInterval(interval)
  }, []) // eslint-disable-line
}

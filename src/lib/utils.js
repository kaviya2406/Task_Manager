import { format, formatDistanceToNow, isToday, isTomorrow, isPast } from 'date-fns'

export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isToday(d)) return `Today ${format(d, 'h:mm a')}`
  if (isTomorrow(d)) return `Tomorrow ${format(d, 'h:mm a')}`
  return format(d, 'MMM d, yyyy h:mm a')
}

export const isOverdue = (dateStr) => {
  if (!dateStr) return false
  return isPast(new Date(dateStr))
}

export const priorityOrder = { High: 0, Medium: 1, Low: 2 }

export const priorityColor = (p) => {
  if (p === 'High') return 'priority-high'
  if (p === 'Medium') return 'priority-medium'
  return 'priority-low'
}

export const priorityBorder = (p) => {
  if (p === 'High') return 'task-border-high'
  if (p === 'Medium') return 'task-border-medium'
  return 'task-border-low'
}

export const getMonthTasks = (tasks, year, month) =>
  tasks.filter(t => {
    const d = new Date(t.createdAt)
    return d.getFullYear() === year && d.getMonth() === month
  })

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

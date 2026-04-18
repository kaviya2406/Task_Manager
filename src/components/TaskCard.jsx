import { Pencil, Trash2, Clock, Flag } from 'lucide-react'
import { formatDate, isOverdue, priorityColor, priorityBorder } from '../lib/utils'

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate) && !task.completed

  return (
    <div
      className={`card p-4 animate-fade-in ${priorityBorder(task.priority)} ${task.completed ? 'task-completed' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`custom-checkbox mt-0.5 ${task.completed ? 'checked' : ''}`}
          aria-label="Toggle complete"
        >
          {task.completed && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="task-title font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">
              {task.title}
            </h3>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-accent transition-colors"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2.5">
            {task.dueDate && (
              <span className={`flex items-center gap-1 text-xs font-medium
                ${overdue ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}>
                <Clock size={11} />
                {formatDate(task.dueDate)}
                {overdue && ' · Overdue'}
              </span>
            )}
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${priorityColor(task.priority)}`}>
              <Flag size={10} />
              {task.priority}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

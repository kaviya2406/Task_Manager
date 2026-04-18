import { useState, useEffect } from 'react'
import { X, Plus, Save } from 'lucide-react'
import { format } from 'date-fns'

const EMPTY = { title: '', description: '', dueDate: '', priority: 'Medium' }

export default function TaskModal({ open, onClose, onSave, editTask }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title || '',
        description: editTask.description || '',
        dueDate: editTask.dueDate ? format(new Date(editTask.dueDate), "yyyy-MM-dd'T'HH:mm") : '',
        priority: editTask.priority || 'Medium',
      })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
  }, [editTask, open])

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSave({
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    })
    onClose()
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            {editTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
              Title *
            </label>
            <input
              className="input-field"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
              Description
            </label>
            <textarea
              className="input-field resize-none"
              rows={3}
              placeholder="Add details..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                Due Date & Time
              </label>
              <input
                type="datetime-local"
                className="input-field"
                value={form.dueDate}
                onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                Priority
              </label>
              <select
                className="input-field"
                value={form.priority}
                onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
            {editTask ? <><Save size={15} /> Save Changes</> : <><Plus size={15} /> Add Task</>}
          </button>
        </div>
      </div>
    </div>
  )
}

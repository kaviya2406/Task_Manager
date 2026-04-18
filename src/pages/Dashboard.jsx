import { useState, useMemo } from 'react'
import { Plus, Trash2, Filter, SortAsc, Search } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { useAuth } from '../context/AuthContext'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'
import StatsCard from '../components/StatsCard'

export default function Dashboard() {
  const { user } = useAuth()
  const { tasks, addTask, updateTask, deleteTask, toggleComplete, removeCompleted } = useTasks()

  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [search, setSearch] = useState('')
  const [filterPriority, setFilterPriority] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'High' && !t.completed).length,
  }), [tasks])

  const filtered = useMemo(() => tasks.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase())
    const matchPriority = filterPriority === 'All' || t.priority === filterPriority
    const matchStatus = filterStatus === 'All' || (filterStatus === 'Active' ? !t.completed : t.completed)
    return matchSearch && matchPriority && matchStatus
  }), [tasks, search, filterPriority, filterStatus])

  const handleSave = (data) => {
    if (editTask) {
      updateTask(editTask.id, data)
    } else {
      addTask(data)
    }
    setEditTask(null)
  }

  const openEdit = (task) => {
    setEditTask(task)
    setModalOpen(true)
  }

  const openAdd = () => {
    setEditTask(null)
    setModalOpen(true)
  }

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
            My Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {stats.pending} task{stats.pending !== 1 ? 's' : ''} remaining
          </p>
        </div>
        <div className="flex gap-2">
          {stats.completed > 0 && (
            <button
              onClick={removeCompleted}
              className="btn-secondary flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">Clear Done</span>
            </button>
          )}
          <button onClick={openAdd} className="btn-primary flex items-center gap-2">
            <Plus size={15} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatsCard label="Total Tasks" value={stats.total} icon="📋" />
        <StatsCard label="Completed" value={stats.completed} icon="✅" color="#22c55e" />
        <StatsCard label="Pending" value={stats.pending} icon="⏳" color="#f59e0b" />
        <StatsCard label="High Priority" value={stats.high} icon="🔴" color="#ef4444" />
      </div>

      {/* Filters */}
      <div className="card p-3 mb-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input-field pl-9"
            placeholder="Search tasks…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="input-field w-auto"
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
          <select
            className="input-field w-auto"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {/* Task list */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">
            {tasks.length === 0 ? '🚀' : '🔍'}
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
            {tasks.length === 0 ? 'No tasks yet' : 'No tasks match'}
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            {tasks.length === 0
              ? 'Create your first task and start being productive!'
              : 'Try adjusting your filters or search query'}
          </p>
          {tasks.length === 0 && (
            <button onClick={openAdd} className="btn-primary mx-auto flex items-center gap-2">
              <Plus size={15} /> Create First Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleComplete}
              onEdit={openEdit}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      <TaskModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTask(null) }}
        onSave={handleSave}
        editTask={editTask}
      />
    </div>
  )
}

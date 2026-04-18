import { useState, useMemo } from 'react'
import { useTasks } from '../context/TaskContext'
import { getMonthTasks } from '../lib/utils'
import { format, subMonths, startOfMonth } from 'date-fns'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const d = subMonths(new Date(), 11 - i)
  return { label: format(d, 'MMM yyyy'), year: d.getFullYear(), month: d.getMonth() }
})

export default function Report() {
  const { tasks } = useTasks()
  const [selected, setSelected] = useState(MONTHS.length - 1)

  const { year, month } = MONTHS[selected]

  const monthTasks = useMemo(() => getMonthTasks(tasks, year, month), [tasks, year, month])

  const stats = useMemo(() => {
    const total = monthTasks.length
    const completed = monthTasks.filter(t => t.completed).length
    const pending = total - completed
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0
    const byPriority = {
      High: monthTasks.filter(t => t.priority === 'High').length,
      Medium: monthTasks.filter(t => t.priority === 'Medium').length,
      Low: monthTasks.filter(t => t.priority === 'Low').length,
    }
    return { total, completed, pending, pct, byPriority }
  }, [monthTasks])

  // Last 6 months bar data
  const last6 = MONTHS.slice(-6)
  const barData = {
    labels: last6.map(m => m.label),
    datasets: [
      {
        label: 'Completed',
        data: last6.map(m => getMonthTasks(tasks, m.year, m.month).filter(t => t.completed).length),
        backgroundColor: 'var(--color-accent)',
        borderRadius: 6,
      },
      {
        label: 'Pending',
        data: last6.map(m => getMonthTasks(tasks, m.year, m.month).filter(t => !t.completed).length),
        backgroundColor: '#e2e8f0',
        borderRadius: 6,
      },
    ],
  }

  const doughnutData = {
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [stats.completed, stats.pending],
      backgroundColor: ['var(--color-accent)', '#f1f5f9'],
      borderWidth: 0,
      hoverOffset: 4,
    }],
  }

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Tasks',
      data: [stats.byPriority.High, stats.byPriority.Medium, stats.byPriority.Low],
      backgroundColor: ['#ef4444', '#eab308', '#22c55e'],
      borderRadius: 6,
    }],
  }

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', stepSize: 1 } },
    },
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Monthly Report</h1>
          <p className="text-slate-400 text-sm mt-0.5">Your productivity at a glance</p>
        </div>
        <select
          className="input-field w-auto"
          value={selected}
          onChange={e => setSelected(Number(e.target.value))}
        >
          {MONTHS.map((m, i) => (
            <option key={i} value={i}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Tasks', value: stats.total, icon: '📋', color: '#3b82f6' },
          { label: 'Completed', value: stats.completed, icon: '✅', color: '#22c55e' },
          { label: 'Pending', value: stats.pending, icon: '⏳', color: '#f59e0b' },
          { label: 'Completion Rate', value: `${stats.pct}%`, icon: '🎯', color: '#8b5cf6' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="card p-5">
            <div className="text-2xl mb-2">{icon}</div>
            <p className="font-display font-bold text-2xl text-slate-900 dark:text-white" style={{ color }}>
              {value}
            </p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        {/* Completion doughnut */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-sm text-slate-700 dark:text-slate-300 mb-4">
            Completion Rate
          </h3>
          {stats.total > 0 ? (
            <div className="flex flex-col items-center">
              <div className="w-40 h-40">
                <Doughnut data={doughnutData} options={{ plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12 } } }, cutout: '70%' }} />
              </div>
              <p className="font-display font-bold text-3xl mt-2 text-accent">{stats.pct}%</p>
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-slate-400 text-sm">
              No data for this month
            </div>
          )}
        </div>

        {/* Priority breakdown */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-sm text-slate-700 dark:text-slate-300 mb-4">
            By Priority
          </h3>
          <div className="h-40">
            <Bar data={priorityData} options={{ ...chartOptions, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Priority list */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-sm text-slate-700 dark:text-slate-300 mb-4">
            Priority Breakdown
          </h3>
          <div className="space-y-3">
            {[
              { label: 'High', count: stats.byPriority.High, color: '#ef4444', bg: 'bg-red-50 dark:bg-red-900/20' },
              { label: 'Medium', count: stats.byPriority.Medium, color: '#eab308', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
              { label: 'Low', count: stats.byPriority.Low, color: '#22c55e', bg: 'bg-green-50 dark:bg-green-900/20' },
            ].map(({ label, count, color, bg }) => (
              <div key={label} className={`flex items-center justify-between p-3 rounded-xl ${bg}`}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label} Priority</span>
                </div>
                <span className="font-bold text-sm" style={{ color }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar chart — 6 months */}
      <div className="card p-5">
        <h3 className="font-display font-semibold text-sm text-slate-700 dark:text-slate-300 mb-4">
          Last 6 Months Overview
        </h3>
        <div className="h-52">
          <Bar
            data={barData}
            options={{
              ...chartOptions,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12 } } },
            }}
          />
        </div>
      </div>

      {/* Task list for selected month */}
      {monthTasks.length > 0 && (
        <div className="card p-5 mt-4">
          <h3 className="font-display font-semibold text-sm text-slate-700 dark:text-slate-300 mb-4">
            Tasks in {MONTHS[selected].label}
          </h3>
          <div className="space-y-2">
            {monthTasks.map(t => (
              <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.completed ? 'bg-green-500' : 'bg-slate-300'}`} />
                <span className={`text-sm flex-1 ${t.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {t.title}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                  ${t.priority === 'High' ? 'priority-high' : t.priority === 'Medium' ? 'priority-medium' : 'priority-low'}`}>
                  {t.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import { useChecklist } from '../hooks/useChecklist'

export default function Checklist() {
  const { items, checks, toggle, completedCount, total } = useChecklist()
  const pct = Math.round((completedCount / total) * 100)

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white">Daily Checklist</h2>
          <p className="text-xs text-slate-400 mt-0.5">Resets every day automatically</p>
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-xl text-accent">{pct}%</p>
          <p className="text-xs text-slate-400">{completedCount}/{total}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'var(--color-accent)' }}
        />
      </div>

      <ul className="space-y-2">
        {items.map(item => (
          <li
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
              ${checks[item.id]
                ? 'bg-accent-light'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <div className={`custom-checkbox ${checks[item.id] ? 'checked' : ''}`}>
              {checks[item.id] && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-lg">{item.icon}</span>
            <span className={`text-sm font-medium ${checks[item.id] ? 'text-accent line-through' : 'text-slate-700 dark:text-slate-300'}`}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

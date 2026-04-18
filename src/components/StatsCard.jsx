export default function StatsCard({ label, value, icon, color = 'accent', sub }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 text-xl"
        style={{ background: color === 'accent' ? 'var(--color-accent)' : color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</p>
        {sub && <p className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

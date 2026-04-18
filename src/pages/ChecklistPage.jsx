import Checklist from '../components/Checklist'
import { format } from 'date-fns'

export default function ChecklistPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Daily Checklist</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          {format(new Date(), 'EEEE, MMMM d yyyy')} · Resets automatically at midnight
        </p>
      </div>

      <Checklist />

      <div className="mt-5 card p-5">
        <h3 className="font-display font-semibold text-base text-slate-900 dark:text-white mb-3">💡 Why daily habits matter</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          Consistent daily habits are the foundation of long-term success. Research shows that people who track
          their habits daily are <strong className="text-slate-700 dark:text-slate-300">3× more likely</strong> to stick
          with them. Check off each item as you complete it — your streak builds discipline automatically.
        </p>
      </div>
    </div>
  )
}

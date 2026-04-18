import { useEffect } from 'react'
import { Bell, X } from 'lucide-react'

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map(t => (
        <div key={t.id} className="toast flex items-start gap-3 animate-bounce-in">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <Bell size={14} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-slate-900 dark:text-white">{t.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.message}</p>
          </div>
          <button onClick={() => onDismiss(t.id)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

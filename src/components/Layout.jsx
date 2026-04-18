import { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Toast from './Toast'
import { useReminder } from '../hooks/useReminder'
import { useCallback } from 'react'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  const onRemind = useCallback((task, minsLeft) => {
    setToasts(prev => [
      ...prev,
      {
        id: `${task.id}-${Date.now()}`,
        title: `⏰ "${task.title}" is due soon!`,
        message: `Due in ${minsLeft} minute${minsLeft !== 1 ? 's' : ''}`,
      }
    ])
  }, [])

  useReminder(onRemind)

  const dismissToast = (id) => setToasts(t => t.filter(x => x.id !== id))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content offset for sidebar */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}

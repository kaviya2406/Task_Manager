import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const DEFAULT_ITEMS = [
  { id: '1', label: 'Wake up early (6:00 AM)', icon: '🌅' },
  { id: '2', label: 'Morning exercise (30 min)', icon: '💪' },
  { id: '3', label: 'Healthy breakfast', icon: '🥗' },
  { id: '4', label: 'Study / Deep work session', icon: '📚' },
  { id: '5', label: 'Take a walk outside', icon: '🚶' },
  { id: '6', label: 'Read for 20 minutes', icon: '📖' },
  { id: '7', label: 'Drink 8 glasses of water', icon: '💧' },
  { id: '8', label: 'Evening meditation', icon: '🧘' },
]

export function useChecklist() {
  const { user } = useAuth()
  const key = user ? `tf_checklist_${user.id}` : null

  const [checks, setChecks] = useState({})
  const [lastDate, setLastDate] = useState('')

  useEffect(() => {
    if (!key) return
    const stored = localStorage.getItem(key)
    if (stored) {
      const { checks: c, date } = JSON.parse(stored)
      const today = new Date().toDateString()
      if (date === today) {
        setChecks(c)
        setLastDate(date)
      } else {
        // Reset on new day
        setChecks({})
        setLastDate(today)
        localStorage.setItem(key, JSON.stringify({ checks: {}, date: today }))
      }
    } else {
      const today = new Date().toDateString()
      setLastDate(today)
    }
  }, [key])

  const toggle = (id) => {
    const updated = { ...checks, [id]: !checks[id] }
    setChecks(updated)
    if (key) {
      localStorage.setItem(key, JSON.stringify({ checks: updated, date: new Date().toDateString() }))
    }
  }

  const completedCount = Object.values(checks).filter(Boolean).length

  return { items: DEFAULT_ITEMS, checks, toggle, completedCount, total: DEFAULT_ITEMS.length }
}

import { format } from 'date-fns'
import { Menu, Moon, Sun, Palette } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

const THEME_COLORS = {
  blue:   '#3b82f6',
  green:  '#10b981',
  purple: '#8b5cf6',
  rose:   '#f43f5e',
  amber:  '#f59e0b',
}

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth()
  const { dark, setDark, colorTheme, setColorTheme, THEMES } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6
                       bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800
                       sticky top-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="font-display font-semibold text-sm text-slate-900 dark:text-white">
            Hello, {user?.name?.split(' ')[0] || 'there'} 👋
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            {format(new Date(), 'EEEE, MMM d yyyy')}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Theme palette */}
        <div className="relative">
          <button
            onClick={() => setPaletteOpen(p => !p)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Palette size={18} />
          </button>
          {paletteOpen && (
            <div className="absolute right-0 top-10 card p-3 flex flex-col gap-2 shadow-xl animate-bounce-in z-50">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Color</p>
              <div className="flex gap-2">
                {THEMES.map(t => (
                  <button
                    key={t}
                    onClick={() => { setColorTheme(t); setPaletteOpen(false) }}
                    style={{ background: THEME_COLORS[t] }}
                    className={`w-6 h-6 rounded-full transition-transform ${colorTheme === t ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'}`}
                    title={t}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dark mode */}
        <button
          onClick={() => setDark(d => !d)}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold ml-1"
          style={{ background: 'var(--color-accent)' }}
        >
          {initials}
        </div>
      </div>
    </header>
  )
}

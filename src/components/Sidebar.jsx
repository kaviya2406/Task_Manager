import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, BarChart3, LogOut, Zap, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/checklist', label: 'Daily Checklist', icon: CheckSquare },
  { to: '/report', label: 'Report', icon: BarChart3 },
]

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight">
              TaskFlow
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-4 mb-3">
            Navigation
          </p>
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="nav-item w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

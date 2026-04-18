import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { validateEmail } from '../lib/utils'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!validateEmail(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setErrors({ general: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent) 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute bottom-20 -left-10 w-60 h-60 rounded-full bg-white/5" />
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-white/10" />

        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white">TaskFlow</span>
        </div>

        <div className="z-10">
          <h1 className="font-display font-bold text-4xl text-white leading-tight mb-4">
            Stay in flow,<br />ship more.
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            The task manager built for people who care about deep work. Prioritize ruthlessly, focus completely.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[['✅', 'Smart Tasks'], ['📊', 'Reports'], ['🔔', 'Reminders']].map(([icon, label]) => (
              <div key={label} className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <p className="text-white/80 text-xs font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/40 text-xs z-10">© 2024 TaskFlow. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-slate-950">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white">TaskFlow</span>
          </div>

          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-1">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-8">Sign in to continue to your workspace</p>

          {errors.general && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-5 text-red-600 dark:text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input-field pr-11"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Signing in…' : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent font-semibold hover:underline">
              Create one
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-400 text-center">
              New here? <Link to="/signup" className="text-accent font-medium">Sign up</Link> to create your account, then log in.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

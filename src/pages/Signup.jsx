import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Zap, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { validateEmail } from '../lib/utils'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const passwordStrength = (p) => {
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  }

  const strength = passwordStrength(form.password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength] || ''
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][strength] || '#e2e8f0'

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!validateEmail(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'At least 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      signup(form.name, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setErrors({ general: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent) 100%)' }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute bottom-20 -left-10 w-60 h-60 rounded-full bg-white/5" />

        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white">TaskFlow</span>
        </div>

        <div className="z-10">
          <h1 className="font-display font-bold text-4xl text-white leading-tight mb-4">
            Your productivity<br />journey starts here.
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            Join thousands of professionals who use TaskFlow to manage their work and life effortlessly.
          </p>

          <div className="mt-10 space-y-3">
            {['Daily checklists to build good habits', 'Smart reminders so nothing slips', 'Monthly reports to track progress'].map(feat => (
              <div key={feat} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white" />
                </div>
                <p className="text-white/80 text-sm">{feat}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/40 text-xs z-10">© 2024 TaskFlow. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-sm py-8">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white">TaskFlow</span>
          </div>

          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-1">Create account</h2>
          <p className="text-slate-400 text-sm mb-8">Free forever. No credit card needed.</p>

          {errors.general && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-5 text-red-600 dark:text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Full Name</label>
              <input
                className="input-field"
                placeholder="Jane Smith"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input-field pr-11"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                           style={{ background: i <= strength ? strengthColor : '#e2e8f0' }} />
                    ))}
                  </div>
                  <p className="text-xs mt-1 font-medium" style={{ color: strengthColor }}>{strengthLabel}</p>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Confirm Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
              />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Creating account…' : <><span>Get Started</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

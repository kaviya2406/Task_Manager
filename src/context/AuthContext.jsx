import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('tf_current_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('tf_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const userData = { id: found.id, name: found.name, email: found.email }
    setUser(userData)
    localStorage.setItem('tf_current_user', JSON.stringify(userData))
    return userData
  }

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('tf_users') || '[]')
    if (users.find(u => u.email === email)) throw new Error('Email already registered')
    const newUser = { id: Date.now().toString(), name, email, password }
    users.push(newUser)
    localStorage.setItem('tf_users', JSON.stringify(users))
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email }
    setUser(userData)
    localStorage.setItem('tf_current_user', JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('tf_current_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

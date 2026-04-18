import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

const THEMES = ['blue', 'green', 'purple', 'rose', 'amber']

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('tf_dark') === 'true')
  const [colorTheme, setColorTheme] = useState(() => localStorage.getItem('tf_theme') || 'blue')

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('tf_dark', dark)
  }, [dark])

  useEffect(() => {
    const root = document.documentElement
    THEMES.forEach(t => root.classList.remove(`theme-${t}`))
    root.classList.add(`theme-${colorTheme}`)
    localStorage.setItem('tf_theme', colorTheme)
  }, [colorTheme])

  return (
    <ThemeContext.Provider value={{ dark, setDark, colorTheme, setColorTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

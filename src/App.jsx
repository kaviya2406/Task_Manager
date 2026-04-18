import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { TaskProvider } from './context/TaskContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ChecklistPage from './pages/ChecklistPage'
import Report from './pages/Report'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <TaskProvider>
              <Layout><Dashboard /></Layout>
            </TaskProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/checklist"
        element={
          <ProtectedRoute>
            <TaskProvider>
              <Layout><ChecklistPage /></Layout>
            </TaskProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/report"
        element={
          <ProtectedRoute>
            <TaskProvider>
              <Layout><Report /></Layout>
            </TaskProvider>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

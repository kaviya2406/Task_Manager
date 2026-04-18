# ⚡ TaskFlow — Task Manager App

A complete, production-quality Task Manager built with **React + Vite + Tailwind CSS**.
Everything runs in the browser using `localStorage` — no backend required.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Checklist.jsx       # Daily habit checklist
│   ├── Layout.jsx          # App shell (sidebar + navbar)
│   ├── Navbar.jsx          # Top bar with theme controls
│   ├── ProtectedRoute.jsx  # Auth guard
│   ├── Sidebar.jsx         # Navigation sidebar
│   ├── StatsCard.jsx       # Metric cards
│   ├── TaskCard.jsx        # Individual task card
│   ├── TaskModal.jsx       # Add/Edit task modal
│   └── Toast.jsx           # Reminder notifications
├── context/
│   ├── AuthContext.jsx     # Login/signup/logout state
│   ├── TaskContext.jsx     # Task CRUD + localStorage
│   └── ThemeContext.jsx    # Dark mode + color themes
├── hooks/
│   ├── useChecklist.js     # Daily checklist logic
│   └── useReminder.js      # Task reminder via setInterval
├── lib/
│   └── utils.js            # Formatting + helpers
└── pages/
    ├── ChecklistPage.jsx   # /checklist
    ├── Dashboard.jsx       # /dashboard
    ├── Login.jsx           # /login
    ├── Report.jsx          # /report
    └── Signup.jsx          # /signup
```

---

## ✨ Features

### 🔐 Authentication
- Sign up / Login with validation
- Passwords stored in localStorage (hashed is beyond scope)
- Per-user task isolation
- Password visibility toggle + strength meter

### 📋 Dashboard
- Add, edit, delete tasks
- Priority: High (🔴), Medium (🟡), Low (🟢)
- Due date & time picker
- Sort by due date (earliest first)
- Filter by priority & status
- Search tasks
- Mark complete / clear done tasks

### ✅ Daily Checklist
- 8 predefined daily habits
- Progress bar
- Auto-resets at midnight (new calendar day)
- Persisted per user

### 🔔 Reminders
- Checks every 60 seconds
- Toast notification when task is due within 10 minutes
- No duplicate reminders

### 📊 Monthly Report
- Filter by month (last 12 months)
- Completion rate doughnut chart
- Priority breakdown bar chart
- 6-month historical overview chart

### 🎨 Themes
- Light / Dark mode toggle
- 5 color themes: Blue, Green, Purple, Rose, Amber

---

## 🛠 Tech Stack

- **React 18** — Functional components + Hooks
- **React Router v6** — Client-side routing
- **Tailwind CSS v3** — Utility-first styling
- **Chart.js + react-chartjs-2** — Data visualization
- **date-fns** — Date formatting
- **lucide-react** — Icons
- **Vite 5** — Build tool

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

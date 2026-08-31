import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Arabic RTL document setup
document.documentElement.lang = 'ar'
document.documentElement.dir = 'rtl'

// Apply persisted theme before first paint
const storedTheme = localStorage.getItem('te-theme')
if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

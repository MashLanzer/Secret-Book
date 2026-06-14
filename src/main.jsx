import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import App from './App'
import './index.css'

async function init() {
  // On native Capacitor, Service Workers cause chunk loading failures after APK updates.
  // Unregister any active SW so all requests go directly to Capacitor's local server.
  if (Capacitor.isNativePlatform() && 'serviceWorker' in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations()
    if (regs.length > 0) {
      await Promise.all(regs.map(r => r.unregister()))
      window.location.reload()
      return
    }
  }

  // On web only, register the PWA Service Worker
  if (!Capacitor.isNativePlatform() && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {})
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

init()

import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import HubPage from './pages/HubPage'

const App: React.FC = () => {
  const [hash, setHash] = useState(window.location.hash || '#/')

  useEffect(() => {
    const handleHashChange = () => {
      let currentHash = window.location.hash
      if (!currentHash || currentHash === '#' || currentHash === '') {
        currentHash = '#/'
      }
      setHash(currentHash)
      // Scroll to top on route change
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', handleHashChange)
    
    // Initial check
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const isAuthenticated = localStorage.getItem('bts_admin_auth') === 'true'

  // Component Router
  const renderView = () => {
    // Admin Routes
    if (hash.startsWith('#/admin')) {
      if (isAuthenticated) {
        return <AdminDashboard />
      }
      return <AdminLogin />
    }

    // Hub Route
    if (hash.startsWith('#/hub-page')) {
      return <HubPage />
    }

    // Default Home for all other hashes (including #products, #about etc handled via scroll)
    return <Home />
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      {renderView()}
    </div>
  )
}

export default App

import React, { useState } from 'react'
import { ShieldCheck, ArrowLeft, Loader2, Lock } from 'lucide-react'

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Simulate terminal authentication delay
    setTimeout(() => {
      if (username.trim().toLowerCase() === 'saqib' && password.trim() === '242242') {
        localStorage.setItem('bts_admin_auth', 'true')
        // Dispatch custom event to notify App component
        window.dispatchEvent(new Event('authChange'))
        window.location.hash = '#/admin/dashboard'
      } else {
        setError('CRITICAL ERROR: ACCESS DENIED. CLEARANCE LEVEL 0 DETECTED.')
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none animate-pulse"></div>
      
      <div className="max-w-xl w-full glass-card p-12 lg:p-20 rounded-[4rem] relative z-10 shadow-[0_60px_150px_rgba(0,0,0,1)] perspective-container">
        <div className="card-3d flex flex-col items-center mb-16">
          <div className="w-32 h-32 bg-blue-600 flex items-center justify-center rounded-[2.5rem] shadow-[0_0_80px_rgba(59,130,246,0.6)] mb-10 animate-float-3d">
            {isLoading ? (
              <Loader2 className="text-white animate-spin" size={60} />
            ) : (
              <ShieldCheck className="text-white" size={60} />
            )}
          </div>
          <h2 className="font-street text-4xl font-black uppercase text-white tracking-widest text-center leading-none">
            TERMINAL <br />
            <span className="text-blue-500 neon-text">SECURE</span>
          </h2>
          <p className="text-slate-600 text-[10px] font-black tracking-[0.6em] mt-6 uppercase opacity-50">Verify Operator Identity</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-500 p-8 text-[11px] font-black uppercase tracking-widest mb-12 text-center rounded-3xl animate-in slide-in-from-top-4 duration-500">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-10">
          <div className="group relative">
            <label className="block text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mb-4 group-focus-within:text-blue-500 transition-colors">OPERATOR_ID</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/5 p-7 text-white outline-none focus:border-blue-500 transition-all font-black text-sm uppercase tracking-widest rounded-3xl shadow-inner placeholder-slate-800"
                required
                placeholder="SAQIB"
                autoFocus
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700">ID</div>
            </div>
          </div>
          
          <div className="group relative">
            <label className="block text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mb-4 group-focus-within:text-blue-500 transition-colors">ACCESS_KEY</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/5 p-7 text-white outline-none focus:border-blue-500 transition-all font-black text-sm uppercase tracking-widest rounded-3xl shadow-inner placeholder-slate-800"
                required
                placeholder="••••••"
              />
              <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-9 bg-blue-600 text-white font-black uppercase tracking-[0.7em] hover:bg-blue-700 disabled:bg-slate-900 transition-all duration-500 rounded-[2.5rem] shadow-2xl text-xs active:scale-95 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center gap-4">
                <Loader2 size={18} className="animate-spin" />
                ESTABLISHING...
              </span>
            ) : (
              'INITIATE LINK'
            )}
          </button>
        </form>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => window.location.hash = '#/'}
            className="text-slate-600 hover:text-white transition-all uppercase text-[10px] font-black tracking-[0.5em] flex items-center justify-center gap-5 mx-auto group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            BACK TO BASE OPS
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

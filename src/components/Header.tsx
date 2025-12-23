
import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Box } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hubCount, setHubCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const hub = JSON.parse(localStorage.getItem('bts_hub') || '[]');
      setHubCount(hub.length);
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    const interval = setInterval(updateCount, 1000);
    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Internal section links (scrolling)
    if (href.startsWith('#') && !href.startsWith('#/')) {
      const currentHash = window.location.hash;
      const isHome = !currentHash || currentHash === '#/' || currentHash === '' || currentHash.startsWith('#home');
      
      if (isHome) {
        e.preventDefault();
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      }
    }
  };

  const navLinks = [
    { name: 'Base', href: '#/' },
    { name: 'Drops', href: '#products' },
    { name: 'The Vault', href: '#/hub-page' },
    { name: 'Manifesto', href: '#about' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0">
            <a href="#/" className="font-street text-2xl font-black tracking-tighter flex items-center group">
              <span className="text-white group-hover:text-blue-500 transition-all duration-300">BACK TO</span>
              <span className="text-blue-500 neon-text ml-2 group-hover:text-white transition-all duration-300">STREETS</span>
            </a>
          </div>

          <div className="hidden lg:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-slate-400 hover:text-white transition-all uppercase text-[10px] font-black tracking-[0.3em] py-2"
              >
                {link.name}
                {link.name === 'The Vault' && hubCount > 0 && (
                  <span className="absolute -top-1 -right-4 bg-blue-600 text-[8px] px-1.5 py-0.5 rounded-full text-white animate-pulse">
                    {hubCount}
                  </span>
                )}
              </a>
            ))}
            <div className="h-6 w-px bg-white/10 mx-2"></div>
            <a 
              href="#/admin" 
              className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all group"
            >
              <Terminal size={16} className="group-hover:animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Operator Login</span>
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-6">
             <a href="#/hub-page" className="relative p-2 text-slate-400">
               <Box size={24} />
               {hubCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-slate-950"></span>}
             </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-500 transition-colors focus:outline-none p-2"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-white/5 px-8 py-12 space-y-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href);
                if (link.href.startsWith('#/')) setIsOpen(false);
              }}
              className="block py-4 text-slate-400 hover:text-blue-500 font-black tracking-[0.4em] uppercase border-b border-white/5 text-xl"
            >
              {link.name} {link.name === 'The Vault' && `[${hubCount}]`}
            </a>
          ))}
          <a
            href="#/admin"
            className="flex items-center gap-4 py-6 text-blue-500 font-black tracking-[0.4em] uppercase text-xl"
            onClick={() => setIsOpen(false)}
          >
            <Terminal size={24} />
            Terminal Access
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;

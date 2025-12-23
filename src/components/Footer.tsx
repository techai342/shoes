
import React from 'react';
import { Instagram, Facebook, Twitter, Mail, ArrowUp } from 'lucide-react';

/**
 * Footer component updated to use standard hash-based anchor tags 
 * for navigation to avoid react-router-dom dependency issues.
 */
const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-blue-900/10 pt-24 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <a href="#/" className="font-street text-4xl font-black tracking-tighter mb-8 inline-block">
              <span className="text-white">BACK TO</span>
              <span className="text-blue-500 neon-text ml-2">STREETS</span>
            </a>
            <p className="text-slate-500 max-w-sm mb-10 font-medium leading-relaxed">
              Forging the future of urban Pakistani fashion. High-spec materials. Low-key aesthetics. We represent the concrete heart of the city.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-xs mb-8">Navigation</h4>
            <ul className="space-y-5">
              {['Home', 'Products', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-500 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-xs mb-8">Base of Ops</h4>
            <ul className="space-y-6 text-slate-500">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Mail size={16} />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest group-hover:text-white transition-colors">ops@backtostreets.pk</span>
              </li>
              <li className="text-[10px] font-black uppercase tracking-[0.2em]">Sector 4, Phase 5, Lahore, PK</li>
              <li className="text-blue-500 font-black uppercase tracking-widest text-xs">Uptime: 24/7 Digital</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
            &copy; {new Date().getFullYear()} BACK TO STREETS // DIGITAL FRONTIER
          </p>
          <div className="flex gap-10 text-slate-600 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-blue-500 transition-colors">Cyber Protocol</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms of Ops</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="w-14 h-14 bg-slate-900 border border-blue-900/20 text-blue-500 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

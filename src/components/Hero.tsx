
import React, { useRef, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!shoeRef.current || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate rotation based on cursor distance from center
    const xVal = (clientX - innerWidth / 2) / 20;
    const yVal = (clientY - innerHeight / 2) / 20;
    
    shoeRef.current.style.transform = `rotateY(${xVal}deg) rotateX(${-yVal}deg) translateZ(50px)`;
  };

  const handleMouseLeave = () => {
    if (!shoeRef.current) return;
    shoeRef.current.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0px)`;
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center pt-32 overflow-hidden bg-slate-950"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-cyber opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-center lg:text-left space-y-12">
            <div className="inline-flex items-center gap-3 px-8 py-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 font-black text-[11px] uppercase tracking-[0.5em] rounded-2xl backdrop-blur-3xl animate-in fade-in slide-in-from-left duration-700">
              <Zap size={16} className="fill-current" />
              Next-Gen PK Streetwear
            </div>
            
            <h1 className="font-street text-7xl md:text-[10rem] font-black leading-[0.75] text-white tracking-tighter uppercase animate-in fade-in slide-in-from-bottom duration-1000">
              STREET <br />
              <span className="text-blue-500 neon-text">ELITE</span>
            </h1>
            
            <p className="text-slate-400 text-xl md:text-2xl max-w-lg leading-relaxed mx-auto lg:mx-0 font-medium animate-in fade-in slide-in-from-bottom delay-200 duration-1000">
              Engineered for the urban hustle. Designed for the cultural vanguard. Forged in Lahore.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start pt-6 animate-in fade-in slide-in-from-bottom delay-400 duration-1000">
              <a
                href="#products"
                onClick={scrollToProducts}
                className="flex items-center justify-center px-16 py-7 bg-blue-600 text-white font-black uppercase tracking-[0.4em] hover:bg-blue-700 transition-all duration-500 rounded-[2.5rem] shadow-[0_30px_60px_rgba(37,99,235,0.3)] group text-[11px]"
              >
                DEPLOY DROPS
                <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" size={20} />
              </a>
              <a
                href="#/hub-page"
                className="flex items-center justify-center px-16 py-7 border border-white/10 bg-white/5 text-white font-black uppercase tracking-[0.4em] hover:border-blue-500 hover:bg-blue-500/5 transition-all duration-500 rounded-[2.5rem] backdrop-blur-3xl text-[11px]"
              >
                HUB DATA
              </a>
            </div>
          </div>
          
          <div className="relative perspective-container mt-20 lg:mt-0">
            <div 
              ref={shoeRef}
              className="relative z-10 card-3d flex justify-center items-center cursor-crosshair group"
            >
              <div className="relative max-w-xl">
                <img 
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200" 
                  alt="Elite Series X1" 
                  className="w-full h-auto drop-shadow-[0_120px_100px_rgba(0,0,0,0.95)] rounded-[80px] border border-white/5 group-hover:border-blue-500/20 transition-all duration-700 transform rotate-[-8deg] scale-100 group-hover:scale-105"
                />
                {/* Floating Labels */}
                <div className="absolute -top-10 -right-10 glass-card px-10 py-6 rounded-3xl border border-white/10 shadow-2xl animate-bounce-slow">
                   <div className="flex flex-col">
                      <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest mb-1">TECH SPEC</span>
                      <span className="text-white font-black text-xl italic tracking-tighter">PHANTOM-V1</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

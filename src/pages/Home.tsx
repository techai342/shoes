
import React, { useState, useEffect } from 'react';
import { Mail, Globe, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { Product } from '../types';
import { INITIAL_PRODUCTS, CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const updateData = () => {
      const savedProducts = localStorage.getItem('bts_products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        setProducts(INITIAL_PRODUCTS);
        localStorage.setItem('bts_products', JSON.stringify(INITIAL_PRODUCTS));
      }
    };

    updateData();
    window.addEventListener('storage', updateData);
    const interval = setInterval(updateData, 2000);
    return () => {
      window.removeEventListener('storage', updateData);
      clearInterval(interval);
    };
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-slate-950 text-white selection:bg-blue-500 selection:text-white scroll-smooth min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />

        {/* Drops Section */}
        <section id="products" className="py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-cyber opacity-10 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-24 gap-12">
              <div className="text-center lg:text-left">
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block animate-pulse">DEPLOYMENT ARCHIVE</span>
                <h2 className="font-street text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
                  ACTIVE <span className="text-blue-500 neon-text">DROPS</span>
                </h2>
              </div>

              {/* Advanced 3D Filter Bar */}
              <div className="flex flex-wrap gap-4 justify-center bg-slate-900/50 p-2 rounded-[24px] border border-white/5 backdrop-blur-xl">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-10 py-4 rounded-[18px] font-black uppercase text-[10px] tracking-widest transition-all duration-500 ${
                      activeCategory === cat 
                      ? 'bg-blue-600 text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)] scale-105' 
                      : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 min-h-[400px]">
              {filteredProducts.map((product) => (
                <div key={product.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <ProductCard product={product} />
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-40 text-center">
                  <p className="text-slate-700 font-street text-2xl uppercase tracking-widest opacity-50 italic">
                    No signals detected in this sector
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tactical Features Section */}
        <section className="py-24 border-y border-white/5 bg-slate-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: <Truck />, label: 'EXPRESS TRANSIT', detail: '3-5 Days PK-wide' },
                { icon: <ShieldCheck />, label: 'AUTHENTICATED', detail: 'Direct from Factory' },
                { icon: <Globe />, label: 'PK IDENTITY', detail: 'Lahore Strategic Base' },
                { icon: <ShieldCheck />, label: 'COMMS LINK', detail: 'Always Active Support' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group perspective-container">
                  <div className="mb-6 p-7 rounded-[28px] bg-slate-900/80 border border-blue-500/10 text-blue-500 group-hover:border-blue-500 group-hover:bg-blue-600/5 transition-all duration-700 card-3d shadow-xl">
                    {item.icon}
                  </div>
                  <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-white group-hover:text-blue-500 transition-colors">{item.label}</h4>
                  <p className="text-slate-600 text-[9px] font-black mt-2 tracking-tighter uppercase">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="perspective-container">
                 <div className="card-3d bg-slate-900/40 p-5 rounded-[50px] border border-white/5 shadow-2xl relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200" 
                      className="w-full h-auto grayscale rounded-[40px] opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 transform group-hover:scale-105"
                      alt="Street Culture"
                    />
                    <div className="absolute inset-0 bg-blue-600/5 blur-[60px] -z-10 group-hover:bg-blue-600/10 transition-all"></div>
                 </div>
              </div>
              <div className="text-center lg:text-left">
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">THE CORE MISSION</span>
                <h2 className="font-street text-5xl md:text-6xl font-black mb-10 uppercase tracking-tighter leading-none">
                  URBAN <span className="text-blue-500">RESISTANCE</span>
                </h2>
                <div className="space-y-8 text-xl text-slate-400 font-medium leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
                  <p>
                    Back To Streets represents the convergence of Pakistani resilience and modern tech-wear aesthetics.
                  </p>
                  <p>
                    Each design is a calculated strike against the ordinary, engineered for those who walk the line between the concrete and the virtual.
                  </p>
                </div>
                <button className="px-14 py-6 bg-white text-black font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all rounded-3xl shadow-2xl text-xs">
                  Full Manifesto
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

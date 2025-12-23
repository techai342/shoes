
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { Box, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

const HubPage: React.FC = () => {
  const [hubItems, setHubItems] = useState<Product[]>([]);

  useEffect(() => {
    const updateData = () => {
      const savedHub = localStorage.getItem('bts_hub');
      if (savedHub) {
        setHubItems(JSON.parse(savedHub));
      }
    };
    updateData();
    window.addEventListener('storage', updateData);
    const interval = setInterval(updateData, 1000);
    return () => {
      window.removeEventListener('storage', updateData);
      clearInterval(interval);
    };
  }, []);

  const clearHub = () => {
    if (window.confirm('Wipe your Vault memory?')) {
      localStorage.setItem('bts_hub', '[]');
      setHubItems([]);
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <Box size={32} />
              </div>
              <div>
                <h1 className="font-street text-4xl font-black tracking-tight uppercase">
                  THE <span className="text-blue-500">VAULT</span>
                </h1>
                <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mt-2">
                  Secured Items: {hubItems.length}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              {hubItems.length > 0 && (
                <button 
                  onClick={clearHub}
                  className="flex items-center gap-2 px-8 py-4 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-2xl font-black uppercase text-[10px] tracking-widest"
                >
                  <Trash2 size={16} />
                  Purge Vault
                </button>
              )}
              <a 
                href="#/" 
                className="flex items-center gap-2 px-8 py-4 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all rounded-2xl font-black uppercase text-[10px] tracking-widest"
              >
                <ArrowLeft size={16} />
                Return to Base
              </a>
            </div>
          </div>

          {hubItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {hubItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-40 text-center border-2 border-dashed border-slate-900 rounded-[50px] bg-slate-900/10 backdrop-blur-sm">
              <ShoppingBag size={80} className="mx-auto text-slate-800 mb-8" />
              <h3 className="text-3xl font-black uppercase tracking-widest text-slate-600">No Intelligence Stored</h3>
              <p className="text-slate-700 font-bold uppercase text-[12px] tracking-[0.5em] mt-3 mb-12">Your personal archive is currently offline</p>
              <a 
                href="#/" 
                className="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 text-white font-black uppercase text-[11px] tracking-[0.3em] hover:bg-blue-700 transition-all rounded-2xl shadow-[0_20px_40px_rgba(37,99,235,0.2)]"
              >
                Intercept Drops
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HubPage;

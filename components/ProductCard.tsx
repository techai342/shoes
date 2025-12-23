
import React, { useState, useEffect, useRef } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isInHub, setIsInHub] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hub = JSON.parse(localStorage.getItem('bts_hub') || '[]');
    setIsInHub(hub.some((item: Product) => item.id === product.id));
  }, [product.id]);

  const toggleHub = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const hub = JSON.parse(localStorage.getItem('bts_hub') || '[]');
    let newHub;
    if (isInHub) {
      newHub = hub.filter((item: Product) => item.id !== product.id);
    } else {
      newHub = [...hub, product];
    }
    localStorage.setItem('bts_hub', JSON.stringify(newHub));
    setIsInHub(!isInHub);
    window.dispatchEvent(new Event('storage'));
  };

  const handleBuyNow = () => {
    const message = encodeURIComponent(
      `Hi Back To Streets! I'm interested in the [${product.name}].\n\nPrice: PKR ${product.price}\nCategory: ${product.category}\n\nPlease guide me on the delivery process.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="perspective-container h-full">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card-3d bg-slate-900/40 border border-white/5 hover:border-blue-500/40 rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-2xl relative transition-all duration-300 group"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-black">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
          
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
            <span className="bg-blue-600/90 backdrop-blur-xl text-white text-[8px] font-black px-5 py-2.5 uppercase tracking-widest rounded-2xl border border-white/10">
              {product.category}
            </span>
            <button 
              onClick={toggleHub}
              className={`p-3.5 rounded-2xl transition-all duration-300 backdrop-blur-xl border ${
                isInHub 
                ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]' 
                : 'bg-black/40 border-white/10 text-white hover:bg-white hover:text-black'
              }`}
            >
              <Heart size={18} className={isInHub ? 'fill-current' : ''} />
            </button>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
        </div>
        
        <div className="p-10 flex-grow flex flex-col">
          <div className="mb-auto">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-3 leading-none group-hover:text-blue-500 transition-colors">
              {product.name}
            </h3>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-8 line-clamp-2">
              {product.description}
            </p>
          </div>
          
          <div className="mt-8 space-y-6">
            <div className="flex items-end justify-between">
               <div className="flex flex-col">
                 <span className="text-slate-600 text-[8px] font-black uppercase tracking-widest mb-1">UNIT PRICE</span>
                 <span className="text-3xl font-black text-white tracking-tighter">
                   PKR {product.price.toLocaleString()}
                 </span>
               </div>
               <Eye className="text-blue-500/20 group-hover:text-blue-500 transition-colors" size={24} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-3 py-5 bg-blue-600 text-white font-black uppercase tracking-widest hover:bg-blue-700 transition-all rounded-2xl shadow-xl text-[10px]"
              >
                <ShoppingBag size={14} />
                SECURE
              </button>
              <button
                onClick={toggleHub}
                className={`flex items-center justify-center gap-3 py-5 font-black uppercase tracking-widest transition-all rounded-2xl text-[10px] border ${
                  isInHub 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent border-white/10 text-slate-400 hover:border-blue-500 hover:text-white'
                }`}
              >
                <Heart size={14} className={isInHub ? 'fill-current' : ''} />
                VAULT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

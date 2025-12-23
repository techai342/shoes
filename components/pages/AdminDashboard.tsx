
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, LogOut, Image as ImageIcon, X, LayoutGrid, Terminal, Cpu } from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS, CATEGORIES } from '../constants';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: CATEGORIES[1],
    image: ''
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('bts_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('bts_products', JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  const saveToStorage = (newProducts: Product[]) => {
    localStorage.setItem('bts_products', JSON.stringify(newProducts));
    setProducts(newProducts);
    window.dispatchEvent(new Event('storage'));
  };

  const handleLogout = () => {
    if (window.confirm('Terminate session?')) {
      localStorage.removeItem('bts_admin_auth');
      window.dispatchEvent(new Event('authChange'));
      window.location.hash = '#/';
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600'
    };

    let newProducts;
    if (editingProduct) {
      newProducts = products.map(p => p.id === editingProduct.id ? productData : p);
    } else {
      newProducts = [productData, ...products];
    }

    saveToStorage(newProducts);
    closeModal();
  };

  const deleteProduct = (id: string) => {
    if (window.confirm('Permanently purge this unit from archives?')) {
      const newProducts = products.filter(p => p.id !== id);
      saveToStorage(newProducts);
    }
  };

  const openModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        category: CATEGORIES[1],
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      {/* 3D Modern Sidebar */}
      <aside className="lg:w-96 bg-slate-900/60 border-r border-white/5 flex flex-col sticky top-0 h-auto lg:h-screen z-20 backdrop-blur-3xl shadow-2xl">
        <div className="p-16 border-b border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <Terminal className="text-blue-500" size={24} />
            <h1 className="font-street text-2xl font-black tracking-tighter">
              OPERATOR <span className="text-blue-500">ROOT</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <p className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">Status: Connected</p>
          </div>
        </div>
        
        <nav className="flex-grow p-10 space-y-6">
          <button className="w-full flex items-center gap-6 px-10 py-6 bg-blue-600/10 text-blue-500 border border-blue-500/20 font-black uppercase tracking-widest text-[11px] rounded-[2rem] shadow-xl group transition-all">
            <LayoutGrid size={20} className="group-hover:rotate-45 transition-transform" />
            INVENTORY DEPLOY
          </button>
          <button className="w-full flex items-center gap-6 px-10 py-6 text-slate-600 hover:text-blue-400 font-black uppercase tracking-widest text-[11px] rounded-[2rem] transition-all">
            <Cpu size={20} />
            SYSTEM LOGS
          </button>
        </nav>
        
        <div className="p-16 border-t border-white/5 bg-black/20">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-6 px-10 py-6 text-slate-500 hover:text-red-500 hover:bg-red-500/5 transition-all font-black uppercase tracking-widest text-[11px] rounded-[2rem] border border-transparent hover:border-red-500/20"
          >
            <LogOut size={20} />
            DISCONNECT
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-10 lg:p-24 relative overflow-x-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[180px] -z-10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-cyber opacity-10 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="space-y-4">
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.6em] animate-pulse">COMMAND_CENTER</span>
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">ACTIVE <br /> <span className="text-blue-500 neon-text">STORAGE</span></h2>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-5 px-14 py-7 bg-blue-600 text-white font-black uppercase tracking-[0.4em] text-[11px] hover:bg-blue-700 transition-all rounded-[2.5rem] shadow-[0_20px_40px_rgba(37,99,235,0.4)] active:scale-95"
          >
            <Plus size={24} />
            NEW DEPLOYMENT
          </button>
        </div>

        <div className="grid gap-10">
          {products.length === 0 ? (
            <div className="py-40 text-center glass-card rounded-[4rem] border-dashed border-white/10">
               <p className="text-slate-600 font-black tracking-widest uppercase">Archive is currently empty. Initialize first unit.</p>
            </div>
          ) : products.map((product) => (
            <div key={product.id} className="glass-card p-10 flex flex-col md:flex-row items-center gap-12 group hover:border-blue-500/40 transition-all rounded-[3.5rem] shadow-2xl relative">
              <div className="relative overflow-hidden rounded-[2rem] w-32 h-32 flex-shrink-0 bg-black border border-white/5">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 opacity-70 group-hover:opacity-100" 
                  alt={product.name} 
                />
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-blue-500 transition-colors leading-none mb-4">{product.name}</h3>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest px-5 py-2 bg-slate-950 rounded-2xl border border-white/5">{product.category}</span>
                  <span className="text-blue-500/40 text-[9px] font-black uppercase tracking-widest">UNIT_ID: {product.id}</span>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-4xl font-black text-white tracking-tighter">PKR {product.price.toLocaleString()}</p>
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mt-2">Current Market Value</p>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => openModal(product)}
                  className="p-6 bg-slate-900/50 text-slate-400 hover:text-white hover:bg-blue-600 transition-all rounded-[1.5rem] border border-white/5 shadow-xl active:scale-90"
                  title="Modify Unit"
                >
                  <Edit2 size={24} />
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className="p-6 bg-red-500/5 text-red-500/50 hover:bg-red-500 hover:text-white transition-all rounded-[1.5rem] border border-red-500/10 shadow-xl active:scale-90"
                  title="Wipe Unit"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cyber Deployment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-3xl animate-in fade-in duration-300">
          <div className="glass-card w-full max-w-5xl rounded-[4rem] shadow-[0_100px_150px_rgba(0,0,0,1)] overflow-hidden animate-in zoom-in duration-500 border border-white/5">
            <div className="p-12 border-b border-white/5 flex justify-between items-center bg-blue-600/5">
              <div className="space-y-2">
                 <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em]">Inventory System</span>
                 <h3 className="font-street text-3xl font-black uppercase tracking-widest">
                   {editingProduct ? 'UPDATE_UNIT' : 'DEPLOY_UNIT'}
                 </h3>
              </div>
              <button onClick={closeModal} className="text-slate-600 hover:text-white p-4 transition-all hover:rotate-90">
                <X size={40} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-12 lg:p-20 space-y-16">
              <div className="grid lg:grid-cols-2 gap-20">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <label className="block text-[9px] text-slate-600 font-black uppercase tracking-[0.5em]">Unit Name</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 p-8 outline-none focus:border-blue-500 transition-all font-black text-sm rounded-3xl uppercase tracking-widest shadow-inner"
                      placeholder="e.g., PHANTOM CORE V2"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="block text-[9px] text-slate-600 font-black uppercase tracking-[0.5em]">Credit (PKR)</label>
                      <input
                        required
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 p-8 outline-none focus:border-blue-500 transition-all font-black text-sm rounded-3xl uppercase tracking-widest shadow-inner"
                        placeholder="15000"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[9px] text-slate-600 font-black uppercase tracking-[0.5em]">Class</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 p-8 outline-none focus:border-blue-500 transition-all font-black text-sm rounded-3xl uppercase tracking-widest shadow-inner cursor-pointer"
                      >
                        {CATEGORIES.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-[9px] text-slate-600 font-black uppercase tracking-[0.5em]">Technical Details</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 p-8 outline-none focus:border-blue-500 transition-all font-black text-sm rounded-3xl uppercase tracking-widest shadow-inner resize-none"
                      placeholder="Detailed unit specifications..."
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-8">
                  <label className="block text-[9px] text-slate-600 font-black uppercase tracking-[0.5em]">Visual Interface</label>
                  <div className="relative aspect-square bg-slate-950 border border-white/10 rounded-[3rem] flex items-center justify-center overflow-hidden group shadow-inner">
                    {formData.image ? (
                      <img src={formData.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Visual Preview" />
                    ) : (
                      <div className="text-center space-y-4">
                         <ImageIcon className="text-slate-800 mx-auto" size={80} />
                         <p className="text-slate-800 font-black text-[9px] tracking-widest">NO SIGNAL DETECTED</p>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 backdrop-blur-xl">
                      <ImageIcon className="text-white mb-6" size={50} />
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white">REPLACE VISUAL</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-10 pt-10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-grow py-8 border border-white/10 text-slate-500 font-black uppercase tracking-widest hover:bg-white/5 transition-all rounded-[2.5rem] active:scale-95"
                >
                  ABORT SESSION
                </button>
                <button
                  type="submit"
                  className="flex-grow py-8 bg-blue-600 text-white font-black uppercase tracking-[0.4em] hover:bg-blue-700 transition-all rounded-[2.5rem] shadow-2xl active:scale-95"
                >
                  {editingProduct ? 'COMMIT CHANGES' : 'EXECUTE DEPLOYMENT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

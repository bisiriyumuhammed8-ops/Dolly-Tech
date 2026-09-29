import React from 'react';
import { SUPPORTED_BRANDS } from '../data/initialData';
import { useBusiness } from '../context/BusinessContext';
import { ArrowUpRight, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export const BrandSection: React.FC = () => {
  const { setSelectedBrand } = useBusiness();

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    const element = document.querySelector('#laptops');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tickerItems = [
    '✨ UK USED GRADE A LAPTOPS',
    '⚡ SAME-DAY MOTHERBOARD REPAIRS',
    '🛡️ 30-POINT DIAGNOSTIC TESTED',
    '📍 16, ONAWALE ST, ISOLO, LAGOS',
    '💻 HP · DELL · LENOVO · APPLE · ASUS',
    '🔧 CRACKED SCREEN & BATTERY FIX',
    '🚀 HIGH-SPEED NVME SSD UPGRADES',
    '💬 INSTANT WHATSAPP REPAIR QUOTES',
  ];

  return (
    <section className="py-12 bg-slate-950 border-y border-slate-800/80 overflow-hidden">
      
      {/* Dynamic Animated Marquee Ribbon */}
      <div className="relative w-full py-2.5 mb-10 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-cyan-950/60 border-y border-cyan-800/30 overflow-hidden">
        <div className="flex w-max animate-marquee gap-8 items-center text-xs font-mono uppercase tracking-wider text-cyan-300">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="font-semibold text-slate-200">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Authorized & Genuine Brands</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Supported Laptop Brands & Service Lines
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            We inventory, upgrade, and repair OEM hardware across all leading global PC and workstation brands.
          </p>
        </div>

        {/* Brand Grid with Interactive Shine & Float */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SUPPORTED_BRANDS.map((brand, idx) => (
            <button
              key={brand.name}
              onClick={() => handleBrandSelect(brand.name)}
              style={{ animationDelay: `${idx * 100}ms` }}
              className="group text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-950/40 flex flex-col justify-between shine-overlay relative"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-black tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {brand.name}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-slate-950/80 border border-slate-800 group-hover:border-cyan-500/50 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {brand.category}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/70 text-[10px] font-medium text-cyan-400/90 flex items-center justify-between">
                <span>View Inventory</span>
                <span className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

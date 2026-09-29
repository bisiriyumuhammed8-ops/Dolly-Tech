import React from 'react';
import { SUPPORTED_BRANDS } from '../data/initialData';
import { useBusiness } from '../context/BusinessContext';
import { ArrowUpRight } from 'lucide-react';

export const BrandSection: React.FC = () => {
  const { setSelectedBrand } = useBusiness();

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    const element = document.querySelector('#laptops');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 bg-slate-950 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-1">
              Authorized & Genuine Brands
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Supported Laptop Brands & Service Lines
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            We inventory, upgrade, and repair OEM hardware across all leading global PC and workstation brands.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SUPPORTED_BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => handleBrandSelect(brand.name)}
              className="group text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-950/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-black tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {brand.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {brand.category}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/70 text-[10px] font-medium text-cyan-400/90 flex items-center justify-between">
                <span>View Inventory</span>
                <span className="text-slate-600">→</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

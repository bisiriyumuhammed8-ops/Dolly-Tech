import React from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Laptop, 
  ArrowUpDown, 
  SlidersHorizontal 
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { 
    filteredLaptops, 
    laptops,
    searchQuery, 
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    selectedCondition,
    setSelectedCondition,
    selectedRam,
    setSelectedRam,
    selectedStorage,
    setSelectedStorage,
    selectedPriceSort,
    setSelectedPriceSort
  } = useBusiness();

  const brands = ['All', 'HP', 'Dell', 'Lenovo', 'Apple', 'ASUS', 'Acer'];
  const conditions = ['All', 'Brand New', 'UK Used / Refurbished'];
  const rams = ['All', '8GB', '16GB'];
  const storages = ['All', '256GB', '512GB'];

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedBrand !== 'All' || 
    selectedCondition !== 'All' || 
    selectedRam !== 'All' || 
    selectedStorage !== 'All' || 
    selectedPriceSort !== 'none';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All');
    setSelectedCondition('All');
    setSelectedRam('All');
    setSelectedStorage('All');
    setSelectedPriceSort('none');
  };

  return (
    <section id="laptops" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-1">
              Store & Certified Inventory
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Premium Laptops for Sale
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Brand new and Grade-A certified UK-used enterprise laptops. Inspected, cleaned, tested, and covered with warranty.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Showing <strong className="text-cyan-400">{filteredLaptops.length}</strong> of {laptops.length} laptops</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            
            {/* Search Input (spans 5 cols) */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, brand, processor, RAM, SSD..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Brand Dropdown (spans 2 cols) */}
            <div className="md:col-span-2">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Brands</option>
                {brands.filter(b => b !== 'All').map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Condition Dropdown (spans 2 cols) */}
            <div className="md:col-span-2">
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Conditions</option>
                <option value="Brand New">Brand New</option>
                <option value="UK Used / Refurbished">UK Used / Refurbished</option>
              </select>
            </div>

            {/* Sort Dropdown (spans 3 cols) */}
            <div className="md:col-span-3 flex items-center gap-2">
              <div className="relative w-full">
                <select
                  value={selectedPriceSort}
                  onChange={(e) => setSelectedPriceSort(e.target.value as any)}
                  className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="none">Sort: Featured</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 shrink-0"
                  title="Reset all filters"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

          {/* Secondary Quick Specs Filters (RAM & Storage) */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              Quick Specs:
            </span>

            {/* RAM segment */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <span className="text-[11px] px-2 text-slate-500 font-mono">RAM</span>
              {rams.map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRam(r)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    selectedRam === r 
                      ? 'bg-cyan-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Storage segment */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <span className="text-[11px] px-2 text-slate-500 font-mono">SSD</span>
              {storages.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedStorage(s)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    selectedStorage === s 
                      ? 'bg-cyan-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredLaptops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLaptops.map((laptop) => (
              <ProductCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Laptops Matched Your Criteria</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Try adjusting or clearing your search keywords and filters to view our full inventory.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

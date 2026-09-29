import React from 'react';
import { 
  Cpu, 
  HardDrive, 
  Maximize2, 
  MessageCircle, 
  Layers, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { LaptopProduct } from '../types';
import { useBusiness } from '../context/BusinessContext';

interface ProductCardProps {
  laptop: LaptopProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ laptop }) => {
  const { formatPrice, setSelectedLaptopModal, getWhatsAppLink } = useBusiness();

  const handleBuyWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello, I want to purchase / enquire about: ${laptop.name} (${laptop.condition}) priced at ${formatPrice(laptop.price)}. Is it available?`;
    window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  const isLimited = laptop.availability === 'Limited Stock';

  return (
    <div 
      onClick={() => setSelectedLaptopModal(laptop)}
      className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/60 shadow-lg shadow-black/20 hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 card-interactive shine-overlay"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <img
            src={laptop.imageUrl}
            alt={`${laptop.brand} ${laptop.name}`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== window.location.origin + '/dollytech-hero.jpg') {
                target.src = '/dollytech-hero.jpg';
              }
            }}
          />
          
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>

          {/* Top Status Bar: Condition & Demo Sample tag */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
            {/* Condition label */}
            <span className="bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-2.5 py-0.5 rounded text-cyan-300 font-semibold shadow">
              {laptop.condition}
            </span>

            {/* Availability */}
            <span className={`px-2 py-0.5 rounded backdrop-blur-md text-[11px] font-medium flex items-center gap-1 ${
              isLimited 
                ? 'bg-amber-950/80 border border-amber-700/60 text-amber-300' 
                : 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-300'
            }`}>
              {isLimited ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
              {laptop.availability}
            </span>
          </div>

          {/* Brand watermark on bottom left of image */}
          <div className="absolute bottom-2.5 left-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            {laptop.brand}
          </div>

          {laptop.isDemoSample && (
            <div className="absolute bottom-2.5 right-3 text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-950/90 border border-slate-800 text-slate-400">
              Demo Sample
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Title */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
              {laptop.name}
            </h3>
            {/* Clean unboxed metadata with dot separators */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <span>{laptop.brand}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{laptop.screenSize}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{laptop.operatingSystem.split(' ')[0]}</span>
            </div>
          </div>

          {/* Specifications Checklist */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate" title={laptop.processor}>{laptop.processor}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{laptop.ram}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{laptop.storage}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{laptop.screenSize}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Card Footer: Price & Action Buttons */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="pt-3 border-t border-slate-800/90 flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Our Price</div>
            <div className="text-lg font-extrabold text-cyan-400 tracking-tight">
              {formatPrice(laptop.price)}
            </div>
          </div>

          {laptop.originalPrice && (
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono text-slate-500 line-through">
                {formatPrice(laptop.originalPrice)}
              </div>
              <div className="text-[11px] font-semibold text-emerald-400">
                Save {formatPrice(laptop.originalPrice - laptop.price)}
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLaptopModal(laptop);
            }}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold text-center transition-colors border border-slate-700/80"
          >
            View Details
          </button>

          <button
            type="button"
            onClick={handleBuyWhatsApp}
            className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Contact to Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

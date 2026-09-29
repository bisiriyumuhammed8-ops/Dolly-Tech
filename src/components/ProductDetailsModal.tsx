import React, { useEffect } from 'react';
import { 
  X, 
  Cpu, 
  HardDrive, 
  Layers, 
  Maximize2, 
  Monitor, 
  Battery, 
  ShieldCheck, 
  MessageCircle, 
  Mail, 
  Check, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const ProductDetailsModal: React.FC = () => {
  const { 
    selectedLaptopModal, 
    setSelectedLaptopModal, 
    formatPrice, 
    getWhatsAppLink 
  } = useBusiness();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLaptopModal(null);
      }
    };
    if (selectedLaptopModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedLaptopModal, setSelectedLaptopModal]);

  if (!selectedLaptopModal) return null;

  const laptop = selectedLaptopModal;
  const isLimited = laptop.availability === 'Limited Stock';

  const handleWhatsAppEnquiry = () => {
    const message = `Hello, I am interested in purchasing: ${laptop.name} (${laptop.condition}) - Price: ${formatPrice(laptop.price)}. Is it available and can I arrange payment/delivery?`;
    window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  const handleMessageEnquiry = () => {
    setSelectedLaptopModal(null);
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSelectedLaptopModal(null)}
    >
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-6 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[11px] sm:text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold border border-slate-700">
              {laptop.condition}
            </span>
            <span className={`text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 ${
              isLimited ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {isLimited ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              {laptop.availability}
            </span>
          </div>

          <button
            onClick={() => setSelectedLaptopModal(null)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 flex-1 overscroll-contain">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Product Image */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={laptop.imageUrl}
                  alt={laptop.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== window.location.origin + '/dollytech-hero.jpg') {
                      target.src = '/dollytech-hero.jpg';
                    }
                  }}
                />
                <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-white border border-slate-800">
                  {laptop.brand} Official Hardware
                </div>
              </div>

              {/* Warranty and Reassurance Card */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Warranty & Quality Guarantee</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  Every pre-owned or new laptop includes our multi-point inspection report, genuine charger, fresh OS installation, and comprehensive testing warranty.
                </p>
              </div>
            </div>

            {/* Right Column: Specs & Purchase Actions */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="text-[11px] sm:text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
                  {laptop.brand} · Model: {laptop.modelNumber}
                </div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
                  {laptop.name}
                </h2>
                
                {/* Price display */}
                <div className="mt-2.5 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
                    {formatPrice(laptop.price)}
                  </span>
                  {laptop.originalPrice && (
                    <span className="text-xs sm:text-sm font-mono text-slate-500 line-through">
                      {formatPrice(laptop.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {laptop.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Technical Specifications
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-mono">Processor</div>
                      <div className="font-semibold text-slate-100">{laptop.processor}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-2">
                    <Layers className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-mono">RAM Memory</div>
                      <div className="font-semibold text-slate-100">{laptop.ram}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-2">
                    <HardDrive className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-mono">Solid State Drive</div>
                      <div className="font-semibold text-slate-100">{laptop.storage}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-2">
                    <Maximize2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-mono">Screen Size</div>
                      <div className="font-semibold text-slate-100">{laptop.screenSize}</div>
                    </div>
                  </div>

                  {laptop.graphics && (
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-2">
                      <Monitor className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-mono">Graphics (GPU)</div>
                        <div className="font-semibold text-slate-100">{laptop.graphics}</div>
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-2">
                    <Battery className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-mono">Operating System</div>
                      <div className="font-semibold text-slate-100">{laptop.operatingSystem}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features Bullet points */}
              {laptop.keyFeatures && laptop.keyFeatures.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {laptop.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-5 border-t border-slate-800 bg-slate-950/80 shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-[11px] sm:text-xs text-slate-400 text-center sm:text-left hidden xs:block">
            <span>Fast nationwide delivery or in-store inspection available.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleMessageEnquiry}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700 min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire via Message</span>
            </button>

            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Buy / Enquire on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { 
  X, 
  Download, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  Sparkles,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const FlyerModal: React.FC = () => {
  const { 
    isFlyerModalOpen, 
    setIsFlyerModalOpen, 
    businessConfig, 
    getWhatsAppLink,
    setIsConfigDrawerOpen
  } = useBusiness();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const flyerSrc = businessConfig.flyerImageUrl || businessConfig.logoUrl || '/logo.png';
  const displayName = businessConfig.businessName || 'DollyTech Solution';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFlyerModalOpen(false);
      }
    };
    if (isFlyerModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFlyerModalOpen, setIsFlyerModalOpen]);

  if (!isFlyerModalOpen) return null;

  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handleWhatsAppInquiry = () => {
    const msg = `Hello ${displayName}, I saw your official flyer / poster and I would like to inquire about your laptop sales and repair services.`;
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsFlyerModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Official Business Flyer"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[94vh] bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800/80 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                {displayName} · Official Business Flyer
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400">
                16, Onawale St, off Ire-Akari Rd, Isolo, Lagos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Flyer Customizer Switch */}
            <button
              onClick={() => {
                setIsFlyerModalOpen(false);
                setIsConfigDrawerOpen(true);
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
              title="Change or upload new flyer image"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Change Image</span>
            </button>

            <button
              onClick={() => setIsFlyerModalOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/60 bg-slate-950/40 text-xs text-slate-300">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Zoom In</span>
            </button>

            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Zoom Out</span>
            </button>

            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1"
              title="Rotate Flyer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Rotate</span>
            </button>

            {(zoomLevel !== 1 || rotation !== 0) && (
              <button
                onClick={handleResetZoom}
                className="text-[11px] text-cyan-400 hover:underline px-1"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={flyerSrc}
              download="dollytech-solution-flyer.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={flyerSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              title="Open full image in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Tab</span>
            </a>
          </div>
        </div>

        {/* Scrollable / Zoomable Flyer Container */}
        <div className="relative flex-1 overflow-auto p-4 sm:p-6 bg-slate-950 flex items-center justify-center min-h-[300px]">
          <div 
            className="transition-transform duration-200 ease-out origin-center"
            style={{ 
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)` 
            }}
          >
            <img
              src={flyerSrc}
              alt="DollyTech Solution Official Business Flyer"
              className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-slate-800 mx-auto"
              onError={(e) => {
                // If custom image fails, fallback to default logo.png or cyber logo
                const target = e.target as HTMLImageElement;
                if (target.src !== window.location.origin + '/logo.png') {
                  target.src = '/logo.png';
                }
              }}
            />
          </div>
        </div>

        {/* Modal Bottom Actions Bar */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950/80 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 text-center sm:text-left">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{businessConfig.address}, {businessConfig.city} · Open Mon–Sat</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`tel:${businessConfig.phone}`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call {businessConfig.phone}</span>
            </a>

            <button
              onClick={handleWhatsAppInquiry}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

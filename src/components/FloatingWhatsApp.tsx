import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const FloatingWhatsApp: React.FC = () => {
  const { getWhatsAppLink, businessConfig } = useBusiness();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Pop-up bubble teaser */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/95 border border-slate-700 text-xs text-white shadow-xl backdrop-blur-md animate-in slide-in-from-right duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span>Need quick price quote or laptop advice? <strong>Chat on WhatsApp</strong></span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="ml-1 text-slate-400 hover:text-white p-0.5 rounded"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-xl shadow-emerald-950/60 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
        aria-label="Chat with business on WhatsApp"
      >
        {/* Subtle ripple wave */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 group-hover:animate-ping pointer-events-none"></span>

        <MessageCircle className="w-7 h-7" />

        {/* Small notification badge */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-400 border-2 border-slate-950"></span>
        </span>
      </a>
    </div>
  );
};

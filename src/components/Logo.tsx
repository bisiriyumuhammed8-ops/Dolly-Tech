import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showTagline = true,
  size = 'md',
  showText = true,
}) => {
  const { businessConfig } = useBusiness();
  const displayName = businessConfig.businessName || 'DollyTech Solution';
  const [imageError, setImageError] = useState(false);

  // Primary local asset with cloud fallback
  const primaryLogoUrl = businessConfig.logoUrl || '/logo.png';
  const fallbackLogoUrl = 'https://i.imgur.com/Qm4GJL3.png';

  const [imgSrc, setImgSrc] = useState(primaryLogoUrl);

  const handleImageError = () => {
    if (imgSrc !== fallbackLogoUrl) {
      setImgSrc(fallbackLogoUrl);
    } else {
      setImageError(true);
    }
  };

  const imageHeights = {
    sm: 'h-8 sm:h-9 max-w-[48px]',
    md: 'h-10 sm:h-11 max-w-[56px]',
    lg: 'h-12 sm:h-14 max-w-[70px]',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official DollyTech Logo Image */}
      {!imageError ? (
        <div className="relative group shrink-0 flex items-center justify-center">
          <div className="p-1 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-md shadow-cyan-950/20 group-hover:border-cyan-500/50 transition-all duration-300">
            <img
              src={imgSrc}
              alt="DollyTech Solution Logo"
              onError={handleImageError}
              className={`${imageHeights[size]} w-auto object-contain rounded-lg filter drop-shadow hover:scale-105 transition-transform duration-300`}
              loading="eager"
            />
          </div>
          {/* Subtle Online / Active Pulse */}
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
        </div>
      ) : (
        /* Graceful SVG fallback if image fails */
        <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden group">
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-cyan-400"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.75" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="12" rx="2" />
              <circle cx="12" cy="10" r="1.5" className="fill-cyan-400 text-cyan-400" />
              <path d="M2 18h20" />
              <path d="M7 18l-1 2h12l-1-2" />
            </svg>
          </div>
        </div>
      )}

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight text-white ${textSizes[size]} leading-tight`}>
              {displayName}
            </span>
          </div>
          {showTagline && (
            <span className="text-[11px] font-medium text-slate-400 tracking-wide mt-0.5">
              Sales · Repairs · Upgrades
            </span>
          )}
        </div>
      )}
    </div>
  );
};

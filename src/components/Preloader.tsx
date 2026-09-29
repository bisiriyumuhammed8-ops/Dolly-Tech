import React, { useState, useEffect } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { 
  Laptop, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  ArrowRight,
  MapPin
} from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { businessConfig, showPreloader, setShowPreloader } = useBusiness();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const logoSrc = businessConfig.logoUrl || '/logo.png';
  const displayName = businessConfig.businessName || 'DollyTech Solution';

  // Dynamic status messages based on loading phase
  const getStatusText = (val: number) => {
    if (val < 20) return 'Initializing DollyTech core system...';
    if (val < 45) return 'Loading verified enterprise laptops & inventory...';
    if (val < 70) return 'Configuring motherboard diagnostic protocols...';
    if (val < 92) return 'Connecting Isolo, Lagos repair center...';
    return 'DollyTech Solution ready. Welcome!';
  };

  const getActiveIcon = (val: number) => {
    if (val < 25) return <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />;
    if (val < 50) return <Laptop className="w-4 h-4 text-cyan-400 animate-bounce" />;
    if (val < 75) return <Wrench className="w-4 h-4 text-cyan-400 animate-pulse" />;
    if (val < 95) return <MapPin className="w-4 h-4 text-emerald-400 animate-pulse" />;
    return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
  };

  // Lock body scroll while preloader is active
  useEffect(() => {
    if (!showPreloader) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showPreloader]);

  // Smooth loading increment
  useEffect(() => {
    if (!showPreloader) return;
    
    setProgress(0);
    setIsExiting(false);
    const startTime = Date.now();
    const duration = 1800; // ~1.8 seconds for brisk, smooth response

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      const smoothed = Math.floor(rawProgress);
      setProgress(smoothed);

      if (rawProgress >= 100) {
        clearInterval(timer);
        // Trigger exit animation
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setShowPreloader(false);
            if (onComplete) onComplete();
          }, 500);
        }, 200);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [showPreloader, setShowPreloader, onComplete]);

  // Handle instant skip/enter
  const handleImmediateEnter = () => {
    setProgress(100);
    setIsExiting(true);
    setTimeout(() => {
      setShowPreloader(false);
      if (onComplete) onComplete();
    }, 300);
  };

  // Listen for keyboard Enter / Escape to bypass quickly
  useEffect(() => {
    if (!showPreloader) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        handleImmediateEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPreloader]);

  if (!showPreloader) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 px-4 py-8 select-none overflow-y-auto transition-all duration-500 ease-out ${
        isExiting 
          ? 'opacity-0 scale-105 pointer-events-none' 
          : 'opacity-100 scale-100'
      }`}
      aria-live="polite"
      aria-label="Loading DollyTech Solution"
    >
      {/* Background Cyber Ambient Lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-indigo-600/15 rounded-full blur-2xl pointer-events-none"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-60"></div>
      </div>

      {/* Main Center Card */}
      <div className="relative z-10 max-w-sm sm:max-w-md w-full flex flex-col items-center text-center space-y-5 sm:space-y-7 my-auto">
        
        {/* Animated Brand Emblem & Ring */}
        <div className="relative flex items-center justify-center">
          {/* Rotating outer cyber ring */}
          <div className="absolute -inset-3 sm:-inset-5 rounded-full border border-dashed border-cyan-500/30 animate-[spin_8s_linear_infinite]"></div>
          
          {/* Pulsing glow aura */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-500/20 to-indigo-500/30 blur-md animate-pulse"></div>

          {/* Logo container */}
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-slate-900/95 border-2 border-slate-700/80 p-2 shadow-2xl shadow-cyan-500/20 flex items-center justify-center overflow-hidden group">
            <img
              src={logoSrc}
              alt="DollyTech Logo"
              className="w-full h-full object-contain filter drop-shadow hover:scale-105 transition-transform"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== window.location.origin + '/dollytech-logo.jpg') {
                  target.src = '/dollytech-logo.jpg';
                }
              }}
            />

            {/* Corner cyber circuit accents */}
            <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-cyan-400"></span>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-cyan-400"></span>
            <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-cyan-400"></span>
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-cyan-400"></span>
          </div>

          {/* Live indicator dot */}
          <div className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-cyan-500 border-2 border-slate-950"></span>
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-1 px-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {displayName}
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-700/60 text-[9px] sm:text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-semibold">
              v2.0
            </span>
          </div>
          <p className="text-[11px] sm:text-sm text-slate-400 font-medium tracking-wide">
            Quality Laptops · Component Repairs · Fast Diagnostics
          </p>
        </div>

        {/* Dynamic Progress Bar & Percent Indicator */}
        <div className="w-full space-y-2.5 px-2">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
              {getActiveIcon(progress)}
              <span className="truncate max-w-[190px] sm:max-w-[260px] text-left">
                {getStatusText(progress)}
              </span>
            </span>
            <span className="text-white font-bold text-xs sm:text-sm tabular-nums">
              {progress}%
            </span>
          </div>

          {/* Modern Progress Bar Track */}
          <div className="relative w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 transition-all duration-150 ease-out rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer light streak across the progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </div>

          {/* Status Sub-badge */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 pt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Isolo Workshop Online
            </span>
            <span className="font-mono">16, Onawale St</span>
          </div>
        </div>

        {/* Quick Instant Entry Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleImmediateEnter}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/60 text-slate-300 hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer active:scale-95 touch-manipulation min-h-[44px]"
          >
            <span>Enter Website Directly</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Bottom Footer Attribution / Trust Note */}
      <div className="relative sm:absolute sm:bottom-6 text-center text-[10px] sm:text-[11px] text-slate-500 pt-4 sm:pt-0">
        16, Onawale St, off Ire-Akari Rd, Isolo, Lagos · +234 817 932 9620
      </div>
    </div>
  );
};

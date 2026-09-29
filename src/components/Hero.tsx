import React, { useState } from 'react';
import { 
  Laptop, 
  Wrench, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  CheckCircle,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  Sparkles,
  Maximize2,
  Star,
  Zap
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const Hero: React.FC = () => {
  const { 
    businessConfig, 
    updateBusinessConfig,
    getWhatsAppLink, 
    setIsFlyerModalOpen,
    setIsConfigDrawerOpen 
  } = useBusiness();

  const [activeTab, setActiveTab] = useState<'showcase' | 'flyer'>(
    businessConfig.heroDisplayMode || 'showcase'
  );

  const displayName = businessConfig.businessName || 'DollyTech Solution';
  const showcaseImage = businessConfig.heroImageUrl || '/dollytech-hero.jpg';
  const flyerImage = businessConfig.flyerImageUrl || businessConfig.logoUrl || '/logo.png';
  const currentHeroImage = activeTab === 'flyer' ? flyerImage : showcaseImage;

  const handleTabChange = (tab: 'showcase' | 'flyer') => {
    setActiveTab(tab);
    updateBusinessConfig({ heroDisplayMode: tab });
  };

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Cybernetic Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 sm:space-y-6">
            
            {/* Top Brand & Location Trust Indicator */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-400">
              <img
                src={businessConfig.logoUrl || '/dollytech-logo.jpg'}
                alt="DollyTech Logo"
                className="w-6 h-6 object-contain rounded-md border border-slate-700 bg-slate-900 p-0.5"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== window.location.origin + '/dollytech-logo.jpg') {
                    target.src = '/dollytech-logo.jpg';
                  }
                }}
              />
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="tracking-wide uppercase font-semibold">
                {businessConfig.city}, {businessConfig.country}
              </span>
              <span className="text-slate-600 hidden xs:inline">·</span>
              <span className="text-slate-300">Sales & Component Repair Center</span>
            </div>

            {/* Main Business Headline & Official Tagline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                <span className="block text-slate-100">{displayName}</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent mt-1">
                  {businessConfig.slogan}
                </span>
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed pt-1 sm:pt-2">
                We supply tested enterprise laptops (HP, Dell, MacBook, Lenovo, ASUS) alongside professional motherboard repair, cracked screen replacement, battery service, and high-speed SSD & RAM upgrades.
              </p>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#laptops"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 active:scale-95 transition-all duration-150 min-h-[44px]"
              >
                <Laptop className="w-4 h-4" />
                <span>Shop Laptops</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#repair-booking"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 font-semibold text-sm active:scale-95 transition-all duration-150 shadow-md min-h-[44px]"
              >
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>Book a Repair</span>
              </a>

              <button
                type="button"
                onClick={() => setIsFlyerModalOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-800/60 font-semibold text-sm transition-all active:scale-95 min-h-[44px]"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>View Official Flyer</span>
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 font-semibold text-sm transition-all active:scale-95 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Quick Proof Signals */}
            <div className="pt-4 sm:pt-6 border-t border-slate-800/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>30-Point Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Same-Day Repairs</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Warranty Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Genuine OEM Parts</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative radial aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-30 pointer-events-none animate-pulse"></div>

              {/* Floating Top-Right Certified Badge */}
              <div className="hidden sm:flex absolute -top-4 -right-4 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-cyan-500/50 shadow-xl shadow-cyan-950/60 animate-float pointer-events-none">
                <span className="p-1 rounded-md bg-cyan-950 text-cyan-400">
                  <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                </span>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-white block">Certified Laptops</span>
                  <span className="text-[10px] text-cyan-300 font-mono">100% Tested UK Used</span>
                </div>
              </div>

              {/* Floating Bottom-Left Express Repair Badge */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-emerald-500/50 shadow-xl shadow-emerald-950/60 animate-float-delayed pointer-events-none">
                <span className="p-1 rounded-md bg-emerald-950 text-emerald-400">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                </span>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-white block">Express Lab Fix</span>
                  <span className="text-[10px] text-emerald-300 font-mono">Same-Day Diagnostic</span>
                </div>
              </div>

              {/* Main Card Image Container */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-800/90 shadow-2xl overflow-hidden p-3 sm:p-4 card-interactive">
                
                {/* Visual View Switcher Header */}
                <div className="flex items-center justify-between gap-2 mb-3 px-1">
                  <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => handleTabChange('showcase')}
                      className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                        activeTab === 'showcase'
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Workshop Showcase</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTabChange('flyer')}
                      className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                        activeTab === 'flyer'
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Official Flyer</span>
                    </button>
                  </div>

                  {/* Change/Customize Image Button */}
                  <button
                    type="button"
                    onClick={() => setIsConfigDrawerOpen(true)}
                    className="flex items-center gap-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded bg-slate-950/80 border border-slate-800 transition-colors"
                    title="Change or upload custom image"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>Change Image</span>
                  </button>
                </div>

                {/* Main Visual Display */}
                <div 
                  className={`relative rounded-xl overflow-hidden bg-slate-950 cursor-pointer group ${
                    activeTab === 'flyer' ? 'aspect-[3/4] sm:aspect-[4/5]' : 'aspect-[4/3]'
                  }`}
                  onClick={() => setIsFlyerModalOpen(true)}
                  title="Click to view full image in high resolution"
                >
                  <img
                    src={currentHeroImage}
                    alt={activeTab === 'flyer' ? 'DollyTech Solution Official Flyer' : 'DollyTech Solution Computer Workshop Showcase'}
                    className="w-full h-full object-contain sm:object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (activeTab === 'flyer') {
                        target.src = '/logo.png';
                      } else {
                        target.src = '/dollytech-hero.jpg';
                      }
                    }}
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>

                  {/* Corner Brand Stamp */}
                  <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    {activeTab === 'flyer' ? 'Official Shop Flyer' : 'DollyTech Hardware Lab'}
                  </div>

                  {/* Corner Fullscreen Icon Indicator */}
                  <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-md text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-colors shadow">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Image Overlay Strip */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 sm:p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {activeTab === 'flyer' ? 'DollyTech Solution Flyer & Services' : 'Enterprise Laptops & Diagnostics'}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-none">
                        Click anywhere to enlarge in full-screen
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlyerModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-semibold transition-colors shrink-0 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Enlarge</span>
                    </button>
                  </div>
                </div>

                {/* Hardware Repair Quick Teaser underneath */}
                <div className="mt-3 p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-100">Need Laptop Screen or Battery Fixed?</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400">Walk-in diagnostics & express repair quotes</div>
                    </div>
                  </div>
                  <a
                    href="#repair-booking"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 shrink-0"
                  >
                    Book Now
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

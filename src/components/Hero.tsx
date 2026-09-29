import React from 'react';
import { 
  Laptop, 
  Wrench, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const Hero: React.FC = () => {
  const { businessConfig, getWhatsAppLink } = useBusiness();

  const displayName = businessConfig.businessName || 'DollyTech Solution';

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
                src={businessConfig.logoUrl || '/logo.png'}
                alt="DollyTech Logo"
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-md border border-slate-700 bg-slate-900 p-0.5"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
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
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-30 pointer-events-none"></div>

              {/* Main Card Image Container */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-800/90 shadow-2xl overflow-hidden p-3 sm:p-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80"
                    alt="Premium Enterprise Laptop Hardware"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  {/* Corner Brand Stamp */}
                  <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Verified Premium Grade
                  </div>

                  {/* Bottom Image Overlay Strip */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 sm:p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Dell & HP Business Series</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-none">Core i5 / i7 / M1 / Ryzen · SSD Upgraded</div>
                    </div>
                    <a 
                      href="#laptops"
                      className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-semibold transition-colors shrink-0"
                    >
                      Browse
                    </a>
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

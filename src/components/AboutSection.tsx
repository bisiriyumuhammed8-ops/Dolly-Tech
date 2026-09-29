import React from 'react';
import { 
  Building2, 
  Target, 
  HeartHandshake, 
  MapPin, 
  Award, 
  CheckCircle,
  Microscope,
  HardDrive
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const AboutSection: React.FC = () => {
  const { businessConfig } = useBusiness();
  const displayName = businessConfig.businessName || 'DollyTech Solution';

  return (
    <section id="about" className="py-20 bg-slate-900/50 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual workshop image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=900&q=80"
                alt="Professional Laptop Repair Workshop & Diagnostics"
                className="w-full h-full object-cover object-center aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center gap-3">
                <img
                  src={businessConfig.logoUrl || '/logo.png'}
                  alt="DollyTech Solution Logo"
                  className="w-10 h-10 object-contain rounded-lg border border-slate-700 bg-slate-900 p-0.5 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="space-y-0.5">
                  <div className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                    DollyTech Workshop & Lab
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    ESD-Safe Motherboard Diagnostics & Micro-Soldering
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About details */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
                About Our Enterprise
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineering Excellence in Laptop Sales & Repairs
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              At <strong className="text-white">{displayName}</strong>, we specialize in bridging high-performance computer technology with reliable, trustworthy local service. Whether you are a software developer seeking an M1 MacBook, a corporate office needing a fleet of Dell Latitudes, or a student needing a fast screen replacement, we provide verified hardware and transparent turnaround times.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To eliminate the frustration of low-quality tech gadgets and predatory repair services by delivering pristine laptops, genuine OEM components, and clear warranties.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <HeartHandshake className="w-4 h-4 text-cyan-400" />
                  <span>Core Values</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Honest diagnostics, fair pricing, customer confidentiality, component-level precision, and dedicated after-sales technical support.
                </p>
              </div>

            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Location: {businessConfig.address}, {businessConfig.city}, {businessConfig.country}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ArrowUp,
  ShieldCheck,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { businessConfig, setSelectedBrand, setIsConfigDrawerOpen, getWhatsAppLink } = useBusiness();
  const currentYear = new Date().getFullYear();

  const displayName = businessConfig.businessName || 'DollyTech Solution';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    const element = document.querySelector('#laptops');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {businessConfig.taglineSecondary}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-semibold flex items-center gap-1.5 hover:bg-emerald-900 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>

              <button
                onClick={() => setIsConfigDrawerOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-medium flex items-center gap-1.5 transition-colors"
                title="Edit Flyer Details"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize Flyer</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-mono">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition-colors">Home Overview</a>
              </li>
              <li>
                <a href="#laptops" className="hover:text-cyan-400 transition-colors">Laptop Sales</a>
              </li>
              <li>
                <a href="#repairs" className="hover:text-cyan-400 transition-colors">Repair Services</a>
              </li>
              <li>
                <a href="#repair-booking" className="hover:text-cyan-400 transition-colors">Book a Repair</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">About Our Lab</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact & Message</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Laptop Brands & Categories (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-mono">
              Laptop Brands
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {['HP', 'Dell', 'Lenovo', 'Apple', 'ASUS', 'Acer'].map(brand => (
                <button
                  key={brand}
                  onClick={() => handleBrandClick(brand)}
                  className="text-left hover:text-cyan-400 transition-colors truncate"
                >
                  {brand} Series
                </button>
              ))}
            </div>

            <div className="pt-2">
              <h5 className="text-slate-300 font-semibold mb-1.5">Common Fixes</h5>
              <div className="flex flex-col space-y-1 text-slate-400">
                <a href="#repairs" className="hover:text-cyan-400 transition-colors">Screen Replacement</a>
                <a href="#repairs" className="hover:text-cyan-400 transition-colors">Battery & DC Jack</a>
                <a href="#repairs" className="hover:text-cyan-400 transition-colors">RAM & SSD NVMe Upgrades</a>
                <a href="#repairs" className="hover:text-cyan-400 transition-colors">Liquid Damage & Micro-Soldering</a>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Hours (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-mono">
              Store & Workshop
            </h4>
            
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{businessConfig.address}, {businessConfig.city}, {businessConfig.country}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${businessConfig.phone}`} className="hover:text-cyan-400 transition-colors">
                  {businessConfig.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{businessConfig.email}</span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span>Hours: {businessConfig.openingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div>
            © {currentYear} <strong className="text-slate-300">{displayName}</strong>. All rights reserved. Built with precision for Nigerian tech users.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

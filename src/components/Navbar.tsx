import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  Wrench, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Eye
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { 
    businessConfig, 
    setIsConfigDrawerOpen, 
    setIsFlyerModalOpen, 
    getWhatsAppLink 
  } = useBusiness();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Laptops', href: '#laptops' },
    { label: 'Repairs', href: '#repairs' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isPhonePlaceholder = businessConfig.phone === '[BUSINESS PHONE]';

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-[11px] sm:text-xs text-slate-300 py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Desktop details */}
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Certified Hardware Technicians & Genuine OEM Parts
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">
              Hours: {businessConfig.openingHours}
            </span>
          </div>

          {/* Mobile compact location info */}
          <div className="flex md:hidden items-center gap-1.5 text-slate-400 truncate text-[11px]">
            <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">Isolo, Lagos · Walk-ins Welcome</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Flyer Button */}
            <button
              type="button"
              onClick={() => setIsFlyerModalOpen(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-[10px] sm:text-[11px] font-semibold transition-colors"
              title="Click to view DollyTech official business flyer and poster"
            >
              <Eye className="w-3 h-3 text-cyan-400" />
              <span>View Flyer</span>
            </button>

            {/* Phone link */}
            <a 
              href={isPhonePlaceholder ? '#contact' : `tel:${businessConfig.phone}`}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{businessConfig.phone}</span>
            </a>

            {/* Quick Flyer Edit Switcher */}
            <button
              onClick={() => setIsConfigDrawerOpen(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 text-[10px] sm:text-[11px] font-semibold transition-colors"
              title="Click to customize business name, phone, WhatsApp, images or address"
            >
              <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
              <span className="hidden xs:inline">Customize</span>
              <span className="xs:hidden">Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/40 py-2.5 sm:py-3' 
            : 'bg-slate-950 border-b border-slate-800/40 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg shrink-0"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-cyan-400 transition-colors py-1 relative group focus:outline-none focus-visible:text-cyan-400"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp Quick Link */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Book a Repair / Contact Us */}
            <a
              href="#repair-booking"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#repair-booking');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-cyan-600/20 transition-all hover:shadow-cyan-500/30 hover:scale-105 active:scale-95"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book a Repair</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${businessConfig.phone}`}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 sm:hidden flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label="Call business phone"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-100" />
              ) : (
                <Menu className="w-6 h-6 text-slate-100" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
            <nav className="flex flex-col space-y-1 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="px-3 py-3 rounded-xl text-slate-200 hover:bg-slate-900 hover:text-cyan-400 text-sm font-semibold transition-colors flex items-center justify-between min-h-[44px]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </a>
              ))}
            </nav>

            {/* Mobile Contact & Action CTAs */}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-colors min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <a
                href="#repair-booking"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#repair-booking');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-md transition-colors min-h-[44px]"
              >
                <Wrench className="w-4 h-4" />
                <span>Book a Computer Repair</span>
              </a>

              <div className="mt-2 pt-2 border-t border-slate-900 text-xs text-slate-400 flex flex-col gap-1 text-center">
                <span>Call: <a href={`tel:${businessConfig.phone}`} className="text-cyan-400 font-bold underline">{businessConfig.phone}</a></span>
                <span>Address: <span className="text-slate-300">{businessConfig.address}, {businessConfig.city}</span></span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

import React, { useState, useRef } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Check, 
  SlidersHorizontal, 
  HelpCircle,
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Building,
  DollarSign,
  Play,
  Upload,
  Image as ImageIcon,
  Eye,
  Laptop
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const BusinessConfigDrawer: React.FC = () => {
  const { 
    businessConfig, 
    updateBusinessConfig, 
    resetBusinessConfig, 
    isConfigDrawerOpen, 
    setIsConfigDrawerOpen,
    triggerPreloader,
    setIsFlyerModalOpen
  } = useBusiness();

  const [formData, setFormData] = useState({
    businessName: businessConfig.businessName || 'DollyTech Solution',
    logoUrl: businessConfig.logoUrl || '/logo.png',
    heroImageUrl: businessConfig.heroImageUrl || '/dollytech-hero.jpg',
    flyerImageUrl: businessConfig.flyerImageUrl || '/logo.png',
    heroDisplayMode: businessConfig.heroDisplayMode || 'showcase',
    slogan: businessConfig.slogan || 'Quality Laptops. Reliable Repairs. Professional Service.',
    phone: businessConfig.phone || '08179329620',
    whatsappNumber: businessConfig.whatsappNumber || '08179329620',
    email: businessConfig.email || 'support@dollytechsolution.ng',
    formspreeEndpoint: businessConfig.formspreeEndpoint || 'https://formspree.io/f/xyezlebw',
    address: businessConfig.address || '16, Onawale Street, off Ire-Akari Road',
    city: businessConfig.city || 'Isolo, Lagos',
    country: businessConfig.country || 'Nigeria',
    openingHours: businessConfig.openingHours || 'Mon - Sat: 8:30 AM – 6:30 PM | Sunday: Closed',
    currencySymbol: businessConfig.currencySymbol || '₦',
  });

  const [activeTab, setActiveTab] = useState<'images' | 'details'>('images');
  const [savedNotification, setSavedNotification] = useState(false);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  if (!isConfigDrawerOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig(formData);
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
      setIsConfigDrawerOpen(false);
    }, 700);
  };

  const handleReset = () => {
    if (window.confirm('Reset all details back to defaults?')) {
      resetBusinessConfig();
      setFormData({
        businessName: 'DollyTech Solution',
        logoUrl: '/logo.png',
        heroImageUrl: '/dollytech-hero.jpg',
        flyerImageUrl: '/logo.png',
        heroDisplayMode: 'showcase',
        slogan: 'Quality Laptops. Reliable Repairs. Professional Service.',
        phone: '08179329620',
        whatsappNumber: '08179329620',
        email: 'support@dollytechsolution.ng',
        formspreeEndpoint: 'https://formspree.io/f/xyezlebw',
        address: '16, Onawale Street, off Ire-Akari Road',
        city: 'Isolo, Lagos',
        country: 'Nigeria',
        openingHours: 'Mon - Sat: 8:30 AM – 6:30 PM | Sunday: Closed',
        currencySymbol: '₦',
      });
    }
  };

  // Handle local image file upload for Logo
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is too large (max 5MB). Please select a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({ ...prev, logoUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle local image file upload for Hero / Flyer
  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is too large (max 5MB). Please select a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({ 
          ...prev, 
          heroImageUrl: reader.result as string,
          flyerImageUrl: reader.result as string 
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Business & Image Customizer</h3>
                <p className="text-[11px] text-slate-400">Configure your images, flyer, and contact information</p>
              </div>
            </div>

            <button
              onClick={() => setIsConfigDrawerOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close customizer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'images'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Images & Branding</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Contact & Store Info</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs overscroll-contain">
            
            <form id="config-form" onSubmit={handleSave} className="space-y-5">
              
              {/* TAB 1: IMAGES & BRANDING */}
              {activeTab === 'images' && (
                <div className="space-y-6">
                  
                  {/* Top Help Banner */}
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 space-y-1">
                    <div className="font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Display Any Image on Your Website</span>
                    </div>
                    <p className="text-[11px] text-cyan-300/80 leading-relaxed">
                      Upload your official flyer, logo, or store photos directly from your phone/computer, or pick from our high-resolution technology presets below.
                    </p>
                  </div>

                  {/* SECTION 1: HERO DISPLAY MODE & HERO IMAGE */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-white flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-cyan-400" />
                        Hero Section Main Visual
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsFlyerModalOpen(true)}
                        className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Preview Full Flyer
                      </button>
                    </div>

                    {/* Mode selector */}
                    <div className="space-y-1.5">
                      <span className="text-slate-400 text-[11px]">Choose What Shows on the Hero Card:</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, heroDisplayMode: 'showcase' })}
                          className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                            formData.heroDisplayMode === 'showcase'
                              ? 'bg-cyan-950/60 border-cyan-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-semibold text-xs flex items-center gap-1.5">
                            <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Workshop Showcase</span>
                          </div>
                          <span className="text-[10px] text-slate-400 leading-tight">
                            Modern laptop workbench & diagnostics banner
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, heroDisplayMode: 'flyer' })}
                          className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                            formData.heroDisplayMode === 'flyer'
                              ? 'bg-cyan-950/60 border-cyan-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-semibold text-xs flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Official Flyer / Poster</span>
                          </div>
                          <span className="text-[10px] text-slate-400 leading-tight">
                            Your full business services poster & prices
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Current Image Preview */}
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <img
                        src={formData.heroDisplayMode === 'flyer' ? formData.flyerImageUrl : formData.heroImageUrl}
                        alt="Hero preview"
                        className="w-full h-full object-contain sm:object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/dollytech-hero.jpg';
                        }}
                      />
                      <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-cyan-300 font-mono">
                        Active: {formData.heroDisplayMode === 'flyer' ? 'Official Flyer' : 'Workshop Showcase'}
                      </div>
                    </div>

                    {/* File Upload Button for Hero/Flyer */}
                    <div>
                      <input
                        type="file"
                        ref={heroFileInputRef}
                        onChange={handleHeroFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => heroFileInputRef.current?.click()}
                        className="w-full py-2.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Your Image from Device (Phone/PC)</span>
                      </button>
                    </div>

                    {/* Presets for Hero / Flyer */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] text-slate-400">Quick Select Image Presets:</span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setFormData({ 
                            ...formData, 
                            heroImageUrl: '/logo.png',
                            flyerImageUrl: '/logo.png',
                            heroDisplayMode: 'flyer' 
                          })}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500 text-left text-slate-300 truncate"
                        >
                          📄 Original Flyer (/logo.png)
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ 
                            ...formData, 
                            heroImageUrl: '/dollytech-hero.jpg',
                            heroDisplayMode: 'showcase' 
                          })}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500 text-left text-slate-300 truncate"
                        >
                          💻 High-Tech Workshop
                        </button>
                      </div>
                    </div>

                    {/* Or Image URL Input */}
                    <div className="space-y-1 pt-1">
                      <label className="text-[10px] uppercase font-mono text-slate-400">
                        Or Paste Web Image URL:
                      </label>
                      <input
                        type="text"
                        value={formData.heroDisplayMode === 'flyer' ? formData.flyerImageUrl : formData.heroImageUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (formData.heroDisplayMode === 'flyer') {
                            setFormData({ ...formData, flyerImageUrl: val });
                          } else {
                            setFormData({ ...formData, heroImageUrl: val });
                          }
                        }}
                        placeholder="https://... or /logo.png"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>
                  </div>

                  {/* SECTION 2: BRAND LOGO */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <label className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Header & Navbar Logo
                    </label>

                    <div className="flex items-center gap-4">
                      {/* Logo Preview */}
                      <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={formData.logoUrl}
                          alt="Logo preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/dollytech-logo.jpg';
                          }}
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          ref={logoFileInputRef}
                          onChange={handleLogoFileUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => logoFileInputRef.current?.click()}
                          className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1.5 border border-slate-700"
                        >
                          <Upload className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Upload New Logo</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, logoUrl: '/dollytech-logo.jpg' })}
                            className="text-[10px] text-cyan-400 hover:underline"
                          >
                            Use Cyber Logo
                          </button>
                          <span className="text-slate-600">·</span>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, logoUrl: '/logo.png' })}
                            className="text-[10px] text-cyan-400 hover:underline"
                          >
                            Use Flyer Badge
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="text-[10px] uppercase font-mono text-slate-400">
                        Logo URL / Path:
                      </label>
                      <input
                        type="text"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        placeholder="/logo.png or /dollytech-logo.jpg"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: STORE & CONTACT DETAILS */}
              {activeTab === 'details' && (
                <div className="space-y-4">
                  {/* Business Name */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-cyan-400" />
                      Business / Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="DollyTech Solution"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Slogan */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">
                      Business Slogan / Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.slogan}
                      onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                      placeholder="Quality Laptops. Reliable Repairs. Professional Service."
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="08179329620"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="08179329620"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="support@dollytechsolution.ng"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="16, Onawale Street, off Ire-Akari Road"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* City & Country */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">City / Area</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Isolo, Lagos"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="Nigeria"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Opening Hours</label>
                    <input
                      type="text"
                      value={formData.openingHours}
                      onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                      placeholder="Mon - Sat: 8:30 AM – 6:30 PM | Sunday: Closed"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

            </form>

          </div>

          {/* Footer Save & Actions */}
          <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  triggerPreloader();
                  setIsConfigDrawerOpen(false);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                title="Preview intro loading animation"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400" />
                <span>Test Intro</span>
              </button>

              <button
                type="submit"
                form="config-form"
                disabled={savedNotification}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-lg ${
                  savedNotification 
                    ? 'bg-emerald-600 text-white shadow-emerald-900/40' 
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 active:scale-95'
                }`}
              >
                {savedNotification ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Applied & Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Apply & Save</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

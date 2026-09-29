import React, { useState } from 'react';
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
  Play
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const BusinessConfigDrawer: React.FC = () => {
  const { 
    businessConfig, 
    updateBusinessConfig, 
    resetBusinessConfig, 
    isConfigDrawerOpen, 
    setIsConfigDrawerOpen,
    triggerPreloader
  } = useBusiness();

  const [formData, setFormData] = useState({
    businessName: businessConfig.businessName,
    logoUrl: businessConfig.logoUrl || '/logo.png',
    slogan: businessConfig.slogan,
    phone: businessConfig.phone,
    whatsappNumber: businessConfig.whatsappNumber,
    email: businessConfig.email,
    formspreeEndpoint: businessConfig.formspreeEndpoint || 'https://formspree.io/f/xyezlebw',
    address: businessConfig.address,
    city: businessConfig.city,
    country: businessConfig.country,
    openingHours: businessConfig.openingHours,
    currencySymbol: businessConfig.currencySymbol || '₦',
  });

  const [savedNotification, setSavedNotification] = useState(false);

  if (!isConfigDrawerOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig(formData);
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
      setIsConfigDrawerOpen(false);
    }, 900);
  };

  const handleReset = () => {
    if (window.confirm('Reset all details back to default flyer placeholders?')) {
      resetBusinessConfig();
      setFormData({
        businessName: 'DollyTech Solution',
        logoUrl: '/logo.png',
        slogan: 'Quality Laptops. Reliable Repairs. Professional Service.',
        phone: '08179329620',
        whatsappNumber: '08179329620',
        email: '[BUSINESS EMAIL]',
        formspreeEndpoint: 'https://formspree.io/f/xyezlebw',
        address: '16, Onawale Street, off Ire-Akari Road',
        city: 'Isolo, Lagos',
        country: 'Nigeria',
        openingHours: 'Mon - Sat: 8:30 AM – 6:30 PM | Sunday: Closed',
        currencySymbol: '₦',
      });
    }
  };

  const setSampleNigerianData = () => {
    setFormData({
      businessName: 'DollyTech Solution',
      logoUrl: '/logo.png',
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
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Flyer & Business Customizer</h3>
                <p className="text-[11px] text-slate-400">Sync information directly from your flyer</p>
              </div>
            </div>

            <button
              onClick={() => setIsConfigDrawerOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flyer Information Source of Truth</span>
              </div>
              <p className="text-[11px] text-cyan-300/80 leading-relaxed">
                If your physical flyer has official contact numbers, address, or slogan, enter them here to update the whole website instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={setSampleNigerianData}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 underline"
              >
                + Fill Sample Nigerian Shop Info
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsConfigDrawerOpen(false);
                  triggerPreloader();
                }}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 bg-amber-950/40 px-2 py-1 rounded border border-amber-800/50"
              >
                <Play className="w-3 h-3" />
                Preview Loading Screen
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-semibold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <form id="flyer-form" onSubmit={handleSave} className="space-y-4">
              
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
                  placeholder="[BUSINESS NAME]"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Logo URL */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Logo Image URL
                </label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="/logo.png or https://i.imgur.com/Qm4GJL3.png"
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
                  placeholder="[BUSINESS PHONE]"
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
                  placeholder="[BUSINESS WHATSAPP]"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  Email Address
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="[BUSINESS EMAIL]"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Formspree Endpoint */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Formspree Email Endpoint
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Active</span>
                </label>
                <input
                  type="text"
                  value={formData.formspreeEndpoint}
                  onChange={(e) => setFormData({ ...formData, formspreeEndpoint: e.target.value })}
                  placeholder="https://formspree.io/f/xyezlebw"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <p className="text-[11px] text-slate-400">
                  All repair requests and customer contact messages are delivered directly to your Formspree inbox.
                </p>
              </div>

              {/* Physical Address */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Physical Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="[BUSINESS ADDRESS]"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* City & Country */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">City / State</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Currency Symbol */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                  Currency Symbol
                </label>
                <select
                  value={formData.currencySymbol}
                  onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="₦">₦ (Nigerian Naira - NGN)</option>
                  <option value="$">$ (US Dollar - USD)</option>
                  <option value="£">£ (British Pound - GBP)</option>
                  <option value="€">€ (Euro - EUR)</option>
                </select>
              </div>

              {/* Opening Hours */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Opening Hours</label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

            </form>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsConfigDrawerOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="flyer-form"
              className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/40 transition-colors"
            >
              {savedNotification ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved & Applied!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Flyer Settings</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

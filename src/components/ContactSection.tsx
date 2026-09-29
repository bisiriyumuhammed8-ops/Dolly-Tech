import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  ExternalLink,
  Laptop,
  Navigation,
  Compass
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

/**
 * Configuration variable for owner email recipient.
 * If flyer specifies business email, use it. Otherwise placeholder is preserved.
 */
export const OWNER_EMAIL = "[REPLACE_WITH_BUSINESS_EMAIL]";

export const ContactSection: React.FC = () => {
  const { 
    businessConfig, 
    laptops, 
    addContactMessage, 
    getWhatsAppLink 
  } = useBusiness();

  // Form State
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [productOfInterest, setProductOfInterest] = useState('');
  const [message, setMessage] = useState('');

  // Status & Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!emailAddress.trim()) {
      newErrors.emailAddress = 'Email Address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailAddress.trim())) {
        newErrors.emailAddress = 'Please enter a valid email address';
      }
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else {
      const cleaned = phoneNumber.replace(/[\s-]/g, '');
      if (cleaned.length < 8 || !/^[+]?[0-9]{8,15}$/.test(cleaned)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      await addContactMessage({
        fullName: fullName.trim(),
        emailAddress: emailAddress.trim(),
        phoneNumber: phoneNumber.trim(),
        subject: subject.trim(),
        productOfInterest: productOfInterest.trim() || undefined,
        message: message.trim(),
      });

      setIsSuccess(true);
      setFullName('');
      setEmailAddress('');
      setPhoneNumber('');
      setSubject('');
      setProductOfInterest('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not deliver message. Please contact us directly by phone or WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const isPhonePlaceholder = businessConfig.phone === '[BUSINESS PHONE]';
  const isEmailPlaceholder = businessConfig.email === '[BUSINESS EMAIL]';
  const isAddressPlaceholder = businessConfig.address === '[BUSINESS ADDRESS]';

  // Configured recipient email: uses businessConfig email if not placeholder, otherwise OWNER_EMAIL
  const activeRecipientEmail = isEmailPlaceholder ? OWNER_EMAIL : businessConfig.email;

  return (
    <section id="contact" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
            Direct Communication
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Us & Message the Business Owner
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Have questions about a laptop in stock, custom upgrades, or require repair assistance? Send us a direct message or visit our workshop.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Information & Location Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white">
                Official Business Info
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">Phone Calls</div>
                    {isPhonePlaceholder ? (
                      <span className="text-slate-200 font-mono text-xs">{businessConfig.phone}</span>
                    ) : (
                      <a 
                        href={`tel:${businessConfig.phone}`}
                        className="text-white font-semibold hover:text-cyan-400 transition-colors"
                      >
                        {businessConfig.phone}
                      </a>
                    )}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">WhatsApp Chat</div>
                    <a 
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>{businessConfig.whatsappNumber}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">Email Address</div>
                    {isEmailPlaceholder ? (
                      <span className="text-slate-200 font-mono text-xs">{businessConfig.email}</span>
                    ) : (
                      <a 
                        href={`mailto:${businessConfig.email}`}
                        className="text-white font-semibold hover:text-cyan-400 transition-colors"
                      >
                        {businessConfig.email}
                      </a>
                    )}
                  </div>
                </div>

                {/* Physical Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">Physical Address</div>
                    <div className="text-slate-200 font-medium leading-relaxed">
                      {businessConfig.address}
                    </div>
                    <div className="text-xs text-slate-400">
                      {businessConfig.city}, {businessConfig.stateOrRegion}, {businessConfig.country}
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">Opening Hours</div>
                    <div className="text-slate-200 font-medium">
                      {businessConfig.openingHours}
                    </div>
                  </div>
                </div>

              </div>

              {/* WhatsApp Quick Action Button */}
              <div className="pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-950/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Directly on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map & Store Location */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold flex items-center gap-1.5 text-white">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Store Location & Interactive Map
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Open for Walk-ins
                </span>
              </div>

              {/* Exact Address Highlight */}
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>16, Onawale Street, off Ire-Akari Road</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Isolo, Lagos State, Nigeria
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
                <iframe
                  title="DollyTech Solution Store Location - 16 Onawale Street off Ire-Akari Road"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=16%20Onawale%20Street%20off%20Ire-Akari%20Road%20Isolo%20Lagos%20Nigeria&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full filter contrast-[1.05] brightness-[0.95]"
                />

                {/* Map Floating Location Pin Badge */}
                <div className="absolute top-2 left-2 z-10 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300 flex items-center gap-1 shadow">
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>DollyTech Solution Workshop</span>
                </div>
              </div>

              {/* Map Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=16+Onawale+Street+off+Ire-Akari+Road+Isolo+Lagos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=16+Onawale+Street+off+Ire-Akari+Road+Isolo+Lagos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Arrival and Landmark Tip */}
              <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                <span className="text-slate-300 font-semibold">📍 Landmark & Transit:</span> Located off Ire-Akari Road, easily accessible from Isolo bus stop, Daleko, and Oshodi-Apapa corridor. Safe parking and express device check-in available.
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Contact Form to Owner */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
              
              <div className="mb-6 space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Messages are dispatched directly to the business email inbox. We reply rapidly.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. We have received your inquiry and will contact you via email or phone shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                        }}
                        placeholder="Your Name"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                          errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                        } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-400">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => {
                          setEmailAddress(e.target.value);
                          if (errors.emailAddress) setErrors(prev => ({ ...prev, emailAddress: '' }));
                        }}
                        placeholder="yourname@gmail.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                          errors.emailAddress ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                        } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all`}
                      />
                      {errors.emailAddress && (
                        <p className="text-[11px] text-rose-400">{errors.emailAddress}</p>
                      )}
                    </div>

                  </div>

                  {/* Phone & Optional Product of Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-300">
                        Phone Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                        }}
                        placeholder="08012345678"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                          errors.phoneNumber ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                        } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-[11px] text-rose-400">{errors.phoneNumber}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-laptop" className="block text-xs font-semibold text-slate-300">
                        Laptop of Interest (Optional)
                      </label>
                      <select
                        id="contact-laptop"
                        value={productOfInterest}
                        onChange={(e) => setProductOfInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                      >
                        <option value="">General Inquiry / Custom Order</option>
                        {laptops.map(lap => (
                          <option key={lap.id} value={lap.name}>
                            {lap.brand} {lap.name} ({lap.condition})
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-300">
                      Subject <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                      }}
                      placeholder="e.g. Availability inquiry for HP EliteBook, or corporate quotation"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                        errors.subject ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-rose-400">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                      }}
                      placeholder="Type your message here..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                        errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-y`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-cyan-900/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Message to Owner...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

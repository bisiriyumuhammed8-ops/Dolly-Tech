import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  MessageCircle, 
  Clock,
  ShieldCheck,
  Smartphone,
  Laptop
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const RepairBookingForm: React.FC = () => {
  const { 
    repairServices, 
    selectedRepairForBooking, 
    setSelectedRepairForBooking,
    addRepairBooking,
    getWhatsAppLink
  } = useBusiness();

  // Form state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  // Status & Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync selected repair service if triggered from cards
  useEffect(() => {
    if (selectedRepairForBooking) {
      setServiceId(selectedRepairForBooking.id);
    }
  }, [selectedRepairForBooking]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else {
      // Basic phone check (supports Nigerian local 080..., 090..., international +234...)
      const cleaned = phoneNumber.replace(/[\s-]/g, '');
      if (cleaned.length < 8 || !/^[+]?[0-9]{8,15}$/.test(cleaned)) {
        newErrors.phoneNumber = 'Please enter a valid phone number (e.g. 08012345678 or +234...)';
      }
    }

    if (!emailAddress.trim()) {
      newErrors.emailAddress = 'Email Address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailAddress.trim())) {
        newErrors.emailAddress = 'Please enter a valid email address';
      }
    }

    if (!deviceModel.trim()) {
      newErrors.deviceModel = 'Device / Laptop model is required (e.g. HP EliteBook 840 G6, MacBook Air M1)';
    }

    if (!problemDescription.trim()) {
      newErrors.problemDescription = 'Please describe the problem or symptoms you are experiencing';
    } else if (problemDescription.trim().length < 10) {
      newErrors.problemDescription = 'Please provide a little more detail (at least 10 characters)';
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
      const selectedService = repairServices.find(s => s.id === serviceId);
      const serviceName = selectedService ? selectedService.name : 'General Laptop Repair';

      await addRepairBooking({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        emailAddress: emailAddress.trim(),
        deviceModel: deviceModel.trim(),
        serviceId: serviceId || 'general',
        serviceName,
        problemDescription: problemDescription.trim(),
        preferredDate: additionalMessage.trim() || undefined
      });

      setIsSuccess(true);
      // Reset form
      setFullName('');
      setPhoneNumber('');
      setEmailAddress('');
      setDeviceModel('');
      setServiceId('');
      setProblemDescription('');
      setAdditionalMessage('');
      setSelectedRepairForBooking(null);
    } catch (err) {
      console.error(err);
      setErrorMessage('An unexpected error occurred while submitting your request. Please try again or message us on WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForwardToWhatsApp = () => {
    const text = `Hello! I would like to book a repair:
Device: ${deviceModel || 'Laptop'}
Problem: ${problemDescription || 'Diagnostics needed'}
Name: ${fullName || 'Customer'}
Phone: ${phoneNumber || 'My Phone'}`;
    window.open(getWhatsAppLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="repair-booking" className="py-12 sm:py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
          <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
            Fast Track Service Desk
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Book a Laptop / Computer Repair
          </h2>
          <p className="text-xs sm:text-base text-slate-400 max-w-xl mx-auto">
            Fill out the details below to schedule your diagnostics or repair. Our certified technicians will review your request and get back to you immediately.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-4 sm:p-10 overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Success State */}
          {isSuccess ? (
            <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Repair Request Received!</h3>
                <p className="text-base text-slate-300 max-w-lg mx-auto font-medium">
                  Thank you. Your repair request has been received. We will contact you shortly.
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Our engineering team reviews incoming tickets continuously during workshop hours.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Submit Another Request
                </button>

                <button
                  type="button"
                  onClick={handleForwardToWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Engineer on WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Error Banner */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Grid 1: Name, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="booking-name" className="block text-xs font-semibold text-slate-300">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="e.g. Adebayo Johnson"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                      errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="booking-phone" className="block text-xs font-semibold text-slate-300">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                    }}
                    placeholder="e.g. 08012345678"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                      errors.phoneNumber ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-rose-400">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                  <label htmlFor="booking-email" className="block text-xs font-semibold text-slate-300">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => {
                      setEmailAddress(e.target.value);
                      if (errors.emailAddress) setErrors(prev => ({ ...prev, emailAddress: '' }));
                    }}
                    placeholder="e.g. adebayo@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                      errors.emailAddress ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                  />
                  {errors.emailAddress && (
                    <p className="text-[11px] text-rose-400">{errors.emailAddress}</p>
                  )}
                </div>

              </div>

              {/* Grid 2: Device Model & Preferred Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Device/Laptop Model */}
                <div className="space-y-1.5">
                  <label htmlFor="booking-model" className="block text-xs font-semibold text-slate-300">
                    Device / Laptop Model <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="booking-model"
                    type="text"
                    value={deviceModel}
                    onChange={(e) => {
                      setDeviceModel(e.target.value);
                      if (errors.deviceModel) setErrors(prev => ({ ...prev, deviceModel: '' }));
                    }}
                    placeholder="e.g. HP EliteBook 840 G6, MacBook Pro A2442"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                      errors.deviceModel ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                  />
                  {errors.deviceModel && (
                    <p className="text-[11px] text-rose-400">{errors.deviceModel}</p>
                  )}
                </div>

                {/* Preferred Service */}
                <div className="space-y-1.5">
                  <label htmlFor="booking-service" className="block text-xs font-semibold text-slate-300">
                    Preferred Service
                  </label>
                  <select
                    id="booking-service"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                  >
                    <option value="">General Hardware Inspection / Diagnostics</option>
                    {repairServices.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Problem / Issue Description */}
              <div className="space-y-1.5">
                <label htmlFor="booking-problem" className="block text-xs font-semibold text-slate-300">
                  Problem / Issue Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="booking-problem"
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => {
                    setProblemDescription(e.target.value);
                    if (errors.problemDescription) setErrors(prev => ({ ...prev, problemDescription: '' }));
                  }}
                  placeholder="Explain what happened (e.g. Screen is cracked and has vertical black lines, laptop doesn't power on after liquid spill, fan is loud and shuts down after 10 mins...)"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                    errors.problemDescription ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                  } text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all resize-y`}
                />
                {errors.problemDescription && (
                  <p className="text-[11px] text-rose-400">{errors.problemDescription}</p>
                )}
              </div>

              {/* Additional Message / Preferred Appointment Time */}
              <div className="space-y-1.5">
                <label htmlFor="booking-notes" className="block text-xs font-semibold text-slate-300">
                  Additional Message or Preferred Drop-off Date (Optional)
                </label>
                <input
                  id="booking-notes"
                  type="text"
                  value={additionalMessage}
                  onChange={(e) => setAdditionalMessage(e.target.value)}
                  placeholder="e.g. Can bring it in tomorrow morning around 10 AM, need it urgently"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Your privacy and hardware data are strictly confidential.</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Repair Request</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

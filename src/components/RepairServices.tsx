import React from 'react';
import { 
  Cpu, 
  Monitor, 
  BatteryCharging, 
  Keyboard, 
  Zap, 
  HardDrive, 
  Layers, 
  ShieldAlert, 
  Flame, 
  TrendingUp, 
  Database, 
  Wrench,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { RepairService } from '../types';

export const RepairServices: React.FC = () => {
  const { repairServices, setSelectedRepairForBooking, getWhatsAppLink } = useBusiness();

  // Map icon string to Lucide icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Monitor': return <Monitor className="w-5 h-5" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5" />;
      case 'Keyboard': return <Keyboard className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      default: return <Wrench className="w-5 h-5" />;
    }
  };

  const handleBookService = (service: RepairService) => {
    setSelectedRepairForBooking(service);
    const formElement = document.querySelector('#repair-booking');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceWhatsApp = (serviceName: string) => {
    const msg = `Hello, I want to book a repair or inquire about the service: "${serviceName}". Can you give me an estimate?`;
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="repairs" className="py-20 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
              Professional Engineering & Diagnostics
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Laptop & Computer Repair Services
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              From cracked screens and liquid damage to component micro-soldering and high-speed SSD upgrades. All repairs use OEM parts and include service warranty.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#repair-booking"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-900/40"
            >
              Request Custom Quote
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairServices.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 shadow-lg shadow-black/20 hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Top Icon & Turnaround Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 text-cyan-400 flex items-center justify-center transition-colors">
                    {getIcon(service.icon)}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{service.estimatedTurnaround}</span>
                  </div>
                </div>

                {/* Service Name & Description */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Subtle Specs / Warranty Info */}
                <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{service.warrantyPeriod || 'Warranty Guarantee'}</span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleBookService(service)}
                  className="flex-1 py-2 px-3 rounded-lg bg-cyan-600/90 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Book Repair</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleServiceWhatsApp(service.name)}
                  className="p-2 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/60 transition-colors"
                  title="Inquire via WhatsApp"
                  aria-label={`Inquire about ${service.name} on WhatsApp`}
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Repair Process Workflow */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-white">How Our Repair Process Works</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Transparent, professional, and rapid turnaround for peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-cyan-400 font-mono text-sm font-bold">STEP 01</div>
              <h4 className="text-sm font-bold text-white">Book or Walk-In</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Submit an online request or bring your device directly to our workshop for an immediate check-in.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-cyan-400 font-mono text-sm font-bold">STEP 02</div>
              <h4 className="text-sm font-bold text-white">30-Point Diagnostics</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our technicians inspect board rails, voltages, memory, display, and isolate the exact root cause.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-cyan-400 font-mono text-sm font-bold">STEP 03</div>
              <h4 className="text-sm font-bold text-white">Transparent Quote</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We provide a clear upfront cost before touching anything. No surprise bills or hidden charges.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-cyan-400 font-mono text-sm font-bold">STEP 04</div>
              <h4 className="text-sm font-bold text-white">Fix & Test Under Load</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                OEM parts installed, thermal paste replaced, benchmarked for stability, and backed by our warranty.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

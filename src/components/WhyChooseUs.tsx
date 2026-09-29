import React from 'react';
import { 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Clock, 
  Tag, 
  Headphones, 
  Sparkles 
} from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS, FREQUENTLY_ASKED_QUESTIONS } from '../data/initialData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-cyan-400" />;
      case 'Award': return <Award className="w-6 h-6 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      case 'Clock': return <Clock className="w-6 h-6 text-cyan-400" />;
      case 'Tag': return <Tag className="w-6 h-6 text-cyan-400" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-cyan-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
            Quality Assurance & Trust
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Customers Trust Our Workshop
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            We operate on integrity, precision engineering, genuine components, and zero-compromise testing on all devices.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {WHY_CHOOSE_US_ITEMS.map((item, index) => (
            <div 
              key={index}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-5">
                {getIcon(item.icon)}
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* FAQs Accordion / Question Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Everything you need to know about purchasing, warranty, and our repair workflow.
            </p>
          </div>

          <div className="space-y-4">
            {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800/90 space-y-2"
              >
                <h4 className="text-sm sm:text-base font-semibold text-white flex items-start gap-2">
                  <span className="text-cyan-400 font-mono font-bold">Q:</span>
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

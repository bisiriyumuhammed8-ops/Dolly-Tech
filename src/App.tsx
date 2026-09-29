/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BusinessProvider } from './context/BusinessContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandSection } from './components/BrandSection';
import { ProductGrid } from './components/ProductGrid';
import { RepairServices } from './components/RepairServices';
import { RepairBookingForm } from './components/RepairBookingForm';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { FlyerModal } from './components/FlyerModal';
import { BusinessConfigDrawer } from './components/BusinessConfigDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Preloader } from './components/Preloader';

export default function App() {
  return (
    <BusinessProvider>
      {/* Intro Preloader Loading Screen on Entry */}
      <Preloader />

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. Laptop Brands Section */}
          <BrandSection />

          {/* 3. Laptop Sales / Store Section */}
          <ProductGrid />

          {/* 4. Computer & Laptop Repair Section */}
          <RepairServices />

          {/* 5. Repair Booking & Request Form */}
          <RepairBookingForm />

          {/* 6. Why Choose Us & FAQs Section */}
          <WhyChooseUs />

          {/* 7. About Us Section */}
          <AboutSection />

          {/* 8. Contact Information & Message Owner Form */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Overlays */}
        <ProductDetailsModal />
        <FlyerModal />
        <BusinessConfigDrawer />
        <FloatingWhatsApp />
      </div>
    </BusinessProvider>
  );
}

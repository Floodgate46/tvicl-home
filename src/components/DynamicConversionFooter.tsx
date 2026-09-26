import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageSquare, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { TVICLLogo } from './TVICLLogo';

export const DynamicConversionFooter: React.FC = () => {
  const { dynamicConversion, setIsConsultationModalOpen, markStageComplete } = useBuyerJourney();

  const handleOpenConsultation = () => {
    markStageComplete('Request');
    setIsConsultationModalOpen(true);
  };

  return (
    <footer id="conversion-footer" className="relative border-t border-[#26221a] bg-[#090807] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#c59b27]/6 rounded-full blur-[140px] pointer-events-none" />

      {/* DYNAMIC CONVERSION BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        <div className="rounded-3xl border border-[#332e24] bg-gradient-to-b from-[#17140f] to-[#100e0b] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle badge indicating dynamic contextual adaptation */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1a13] border border-[#c59b27]/40 text-[#e5c07b] text-xs font-medium mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dynamicConversion.accentBadge}</span>
          </div>

          {/* Contextual Evolving Headline */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={dynamicConversion.headline}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#f5f3ef] max-w-3xl mx-auto leading-tight"
            >
              {dynamicConversion.headline}
            </motion.h2>
          </AnimatePresence>

          {/* Contextual Evolving Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={dynamicConversion.subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-sm sm:text-base text-[#b8b09f] max-w-2xl mx-auto leading-relaxed font-light"
            >
              {dynamicConversion.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleOpenConsultation}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-sm sm:text-base tracking-wide hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-[#c59b27]/25 cursor-pointer"
            >
              <span>{dynamicConversion.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#131210]" />
            </button>

            <button
              onClick={handleOpenConsultation}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg border border-[#3d382d] bg-[#161410] text-[#e6e2d8] font-medium text-sm sm:text-base hover:border-[#c59b27]/80 hover:bg-[#201d17] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#d4af37]" />
              <span>Request a Consultation</span>
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER DIRECTORY & LEGAL */}
      <div className="border-t border-[#1c1a15] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#1c1a15] text-xs">
            {/* Column 1: Brand & Philosophy */}
            <div className="space-y-4 md:col-span-1">
              <TVICLLogo variant="horizontal" size="md" showSubtitle={true} />
              <p className="text-[#8c8474] leading-relaxed text-xs">
                The Valley Investment Company Limited (TVICL). A premier Nigerian architectural and construction practice crafting enduring luxury residences across West Africa.
              </p>
            </div>

            {/* Column 2: Platform Links */}
            <div>
              <h4 className="font-semibold text-[#f5f3ef] uppercase tracking-wider mb-3">
                Experience
              </h4>
              <ul className="space-y-2 text-[#999080]">
                <li><a href="#dream-home" className="hover:text-[#e5c07b] transition-colors">Dream Home Studio</a></li>
                <li><a href="#construction-pulse" className="hover:text-[#e5c07b] transition-colors">Construction Pulse</a></li>
                <li><a href="#materials" className="hover:text-[#e5c07b] transition-colors">Materials Sourcing</a></li>
                <li><a href="#smart-home" className="hover:text-[#e5c07b] transition-colors">Smart Living OS</a></li>
                <li><a href="#surface-stories" className="hover:text-[#e5c07b] transition-colors">Surface Stories</a></li>
              </ul>
            </div>

            {/* Column 3: Active Locations */}
            <div>
              <h4 className="font-semibold text-[#f5f3ef] uppercase tracking-wider mb-3">
                Presence
              </h4>
              <ul className="space-y-2 text-[#999080]">
                <li>Banana Island & Ikoyi, Lagos</li>
                <li>Lekki Phase 1 & 2, Lagos</li>
                <li>Maitama & Guzape, Abuja</li>
                <li>Jabi Lakefront, Abuja</li>
                <li>Old GRA, Port Harcourt</li>
              </ul>
            </div>

            {/* Column 4: Private Consultation */}
            <div>
              <h4 className="font-semibold text-[#f5f3ef] uppercase tracking-wider mb-3">
                Private Advisory
              </h4>
              <p className="text-[#8c8474] leading-relaxed mb-3">
                Consult with our senior registered architects and structural engineers.
              </p>
              <div className="text-[#e5c07b] font-mono text-xs">
                concierge@tvicl.ng
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#635c4e] gap-4">
            <p>© {new Date().getFullYear()} TVICL Residential Architecture. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#8c8474] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#8c8474] transition-colors">Terms of Practice</a>
              <a href="#" className="hover:text-[#8c8474] transition-colors">Engineering Standards</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

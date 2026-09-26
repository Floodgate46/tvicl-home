import React from 'react';
import { motion } from 'motion/react';
import {
  Home,
  Activity,
  Layers,
  Cpu,
  Palette,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { BuyerJourneyTracker } from './BuyerJourneyTracker';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { TVICLLogo } from './TVICLLogo';

const ECOSYSTEM_ITEMS = [
  {
    id: 'eco-dream-home',
    title: 'Dream Home',
    desc: 'Design, configure and estimate.',
    cta: 'Design my dream home',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    targetId: 'dream-home',
  },
  {
    id: 'eco-pulse',
    title: 'Construction Pulse',
    desc: 'Follow real projects and track progress.',
    cta: 'Follow a live project',
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=600&q=80',
    targetId: 'construction-pulse',
  },
  {
    id: 'eco-materials',
    title: 'Materials & Sourcing',
    desc: 'Explore and build your material package.',
    cta: 'Build my material package',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80',
    targetId: 'materials',
  },
  {
    id: 'eco-smart',
    title: 'Smart Home',
    desc: 'Experience modern living technology.',
    cta: 'Configure my smart features',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    targetId: 'smart-home',
  },
  {
    id: 'eco-surfaces',
    title: 'Surface Stories',
    desc: 'Discover finishes and design ideas.',
    cta: 'Create my finish story',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
    targetId: 'surface-stories',
  },
  {
    id: 'eco-quiz',
    title: 'Home Quiz',
    desc: 'Find the right home for your lifestyle.',
    cta: 'Find my home in 60 seconds',
    icon: HelpCircle,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
    targetId: 'home-quiz',
  },
];

export const EcosystemOverview: React.FC = () => {
  const { markStageComplete, setIsQuizModalOpen } = useBuyerJourney();

  const handleCardClick = (item: (typeof ECOSYSTEM_ITEMS)[0]) => {
    markStageComplete('Explore');
    if (item.id === 'eco-quiz') {
      setIsQuizModalOpen(true);
      return;
    }
    const el = document.getElementById(item.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ecosystem" className="py-16 sm:py-20 border-t border-[#26221a] bg-[#0c0b09]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Persistent Buyer-Journey Tracker */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#242019]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TVICLLogo variant="mark-only" size="sm" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
                THE TVICL ECOSYSTEM
              </span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-serif text-[#f5f3ef]">
              One platform. Every part of your home journey.
            </h2>
          </div>

          <div className="w-full lg:max-w-xl">
            <BuyerJourneyTracker compact />
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {ECOSYSTEM_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                onClick={() => handleCardClick(item)}
                className="group relative rounded-xl overflow-hidden border border-[#2b271f] bg-[#14120e] hover:border-[#c59b27]/70 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#c59b27]/10"
              >
                {/* Header with Icon */}
                <div className="p-3.5 pb-2 flex items-center gap-2 border-b border-[#211d17]">
                  <div className="w-6 h-6 rounded bg-[#1c1913] border border-[#332e24] flex items-center justify-center text-[#e5c07b] group-hover:bg-[#d4af37] group-hover:text-[#131210] transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-serif font-semibold text-[#f5f3ef] truncate">
                    {item.title}
                  </h3>
                </div>

                {/* Preview Thumbnail */}
                <div className="h-28 w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14120e] via-transparent to-transparent" />
                </div>

                {/* Description & Link matching screenshot */}
                <div className="p-3 flex-1 flex flex-col justify-between bg-[#14120e]">
                  <p className="text-[11px] text-[#9c9484] leading-relaxed mb-3 line-clamp-2">
                    {item.desc}
                  </p>
                  
                  <div className="flex items-center gap-1 text-[11px] font-medium text-[#e5c07b] group-hover:text-[#f8d77a] transition-colors mt-auto">
                    <span className="truncate">{item.cta}</span>
                    <ArrowRight className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

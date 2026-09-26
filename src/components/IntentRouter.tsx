import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Home,
  Lightbulb,
  Sliders,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';

interface IntentCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  routeSteps: string[];
  ctaLabel: string;
  targetId: string;
}

const INTENT_CARDS: IntentCardData[] = [
  {
    id: 'build',
    title: 'I want to Build a Home',
    description: 'Design, plan and build my ideal home from groundbreaking to completion.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    routeSteps: ['Projects', 'Materials', 'Consultation'],
    ctaLabel: 'Start with Projects, Materials and Consultation',
    targetId: 'dream-home',
  },
  {
    id: 'inspire',
    title: 'I want Inspiration',
    description: 'Explore designs, luxury finishes, architectural moods and curated ideas.',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    routeSteps: ['Dream Home', 'Surface Stories', 'Concept Board'],
    ctaLabel: 'Start with Dream Home and Surface Stories',
    targetId: 'surface-stories',
  },
  {
    id: 'personalize',
    title: 'I want to Personalize My Home',
    description: 'Choose bespoke materials, tactile finishes and smart home ecosystems.',
    icon: Sliders,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    routeSteps: ['Home Quiz', 'Smart Home', 'Materials'],
    ctaLabel: 'Start with Home Quiz and Smart Home',
    targetId: 'smart-home',
  },
  {
    id: 'direct',
    title: 'I know What I Want',
    description: 'Find existing projects, specify exact materials and submit a direct brief.',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=800&q=80',
    routeSteps: ['Projects', 'Direct Request'],
    ctaLabel: 'Start with Projects and Direct Request',
    targetId: 'construction-pulse',
  },
];

export const IntentRouter: React.FC = () => {
  const { markStageComplete, setIsConsultationModalOpen, setIsQuizModalOpen } = useBuyerJourney();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedIntentId, setSelectedIntentId] = useState<string | null>(null);

  const handleCardClick = (card: IntentCardData) => {
    setSelectedIntentId(card.id);
    markStageComplete('Explore');

    if (card.id === 'direct') {
      setIsConsultationModalOpen(true);
      return;
    }
    if (card.id === 'personalize') {
      setIsQuizModalOpen(true);
      return;
    }

    const targetEl = document.getElementById(card.targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="intent-router" className="relative py-16 sm:py-20 border-t border-[#26221a] bg-[#0e0d0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
            WHAT BRINGS YOU TO TVICL TODAY?
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-serif text-[#f5f3ef]">
            Choose what best describes you and we'll guide you to the right experience.
          </h2>
        </div>

        {/* 4 Interactive Intent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INTENT_CARDS.map((card) => {
            const Icon = card.icon;
            const isHovered = hoveredCardId === card.id;
            const isAnyHovered = hoveredCardId !== null;
            const isDimmed = isAnyHovered && !isHovered;
            const isSelected = selectedIntentId === card.id;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => handleCardClick(card)}
                animate={{
                  scale: isHovered ? 1.025 : 1,
                  opacity: isDimmed ? 0.72 : 1,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#e5c07b] bg-[#1a1712] ring-2 ring-[#e5c07b]/30 shadow-[0_10px_30px_rgba(212,175,55,0.25)]'
                    : isHovered
                    ? 'border-[#c59b27]/80 bg-[#171510] shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
                    : 'border-[#2d2921] bg-[#14120e]'
                }`}
              >
                {/* Image Top Half with subtle zoom on hover */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                  <motion.img
                    src={card.image}
                    alt={card.title}
                    animate={{
                      scale: isHovered ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14120e] via-black/30 to-transparent" />
                  
                  {/* Floating Icon badge */}
                  <div className="absolute bottom-3 left-4 w-9 h-9 rounded-lg bg-[#110f0c]/90 backdrop-blur-md border border-[#3b3528] flex items-center justify-center text-[#e5c07b]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-[#9e9684] uppercase">
                      I want
                    </span>
                    <h3 className="text-lg font-serif font-medium text-[#f5f3ef] mt-0.5 leading-snug">
                      {card.title.replace('I want to ', '').replace('I want ', '').replace('I know ', '')}
                    </h3>
                    <p className="mt-2 text-xs text-[#a39b8c] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Animated Route Badge (Reveals route steps on hover) */}
                  <div className="mt-5 pt-3 border-t border-[#262219]">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#d4af37] flex-wrap mb-3">
                      {card.routeSteps.map((step, idx) => (
                        <React.Fragment key={step}>
                          <span
                            className={`px-1.5 py-0.5 rounded ${
                              isHovered ? 'bg-[#c59b27]/20 text-[#f5e6b8]' : 'text-[#a39474]'
                            } transition-colors`}
                          >
                            {step}
                          </span>
                          {idx < card.routeSteps.length - 1 && (
                            <span className="text-[#635a49]">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-[#f5f3ef] group">
                      <span className="text-[11px] text-[#b8b0a0] group-hover:text-[#e5c07b] transition-colors truncate max-w-[85%]">
                        {card.ctaLabel}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-[#201d16] border border-[#383226] flex items-center justify-center text-[#e5c07b] group-hover:bg-[#d4af37] group-hover:text-[#131210] transition-colors flex-shrink-0">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
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

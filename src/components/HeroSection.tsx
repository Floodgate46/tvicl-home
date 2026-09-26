import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Play,
  Building2,
  Gem,
  Cpu,
  Sparkles,
  Headphones,
  Bed,
  Bath,
  ChevronRight,
  ChevronLeft,
  Pause,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';

interface PropertyPerspective {
  id: string;
  label: 'Exterior' | 'Interior' | 'Living';
  title: string;
  price: string;
  subtitle: string;
  image: string;
  bedrooms: string;
  bathrooms: string;
  style: string;
  finish: string;
}

const HERO_PERSPECTIVES: PropertyPerspective[] = [
  {
    id: 'exterior-dusk',
    label: 'Exterior',
    title: '5 Bedroom Luxury Home',
    price: '₦85,000,000',
    subtitle: 'Estimated Investment',
    // Wide cinematic architectural villa matching screenshot: warm interior illumination at twilight
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85',
    bedrooms: '5 Bedrooms',
    bathrooms: '6 Bathrooms',
    style: 'Modern Style',
    finish: 'Premium Finish',
  },
  {
    id: 'interior-salon',
    label: 'Interior',
    title: 'Double-Volume Great Room',
    price: '₦85,000,000',
    subtitle: 'Interior Atmosphere',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85',
    bedrooms: 'Double-Height Ceilings',
    bathrooms: 'Warm Travertine Cladding',
    style: 'Bespoke Joinery',
    finish: 'Ambient Cove Illumination',
  },
  {
    id: 'living-terrace',
    label: 'Living',
    title: 'Infinity Terrace & Lanai',
    price: '₦85,000,000',
    subtitle: 'Outdoor Architecture',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    bedrooms: 'Zero-Edge Heated Pool',
    bathrooms: 'Sunken Fire Lounge',
    style: 'Perimeter Acoustic Louvres',
    finish: 'Natural Slate & Teak',
  },
];

export const HeroSection: React.FC = () => {
  const { markStageComplete } = useBuyerJourney();
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentView = HERO_PERSPECTIVES[activeSlideIdx];

  // Auto-advancing slide carousel (6.5s per slide) with pause-on-hover
  useEffect(() => {
    if (isPaused) {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }

    slideTimerRef.current = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % HERO_PERSPECTIVES.length);
    }, 6500);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isPaused]);

  const nextSlide = () => {
    setActiveSlideIdx((prev) => (prev + 1) % HERO_PERSPECTIVES.length);
  };

  const prevSlide = () => {
    setActiveSlideIdx((prev) => (prev - 1 + HERO_PERSPECTIVES.length) % HERO_PERSPECTIVES.length);
  };

  const scrollToConfigurator = () => {
    markStageComplete('Configure');
    const el = document.getElementById('dream-home');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    markStageComplete('Explore');
    const el = document.getElementById('construction-pulse');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToIntentRouter = () => {
    markStageComplete('Explore');
    const el = document.getElementById('intent-router');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="discover"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[92vh] lg:min-h-[98vh] pt-24 sm:pt-28 pb-8 sm:pb-10 flex flex-col justify-between overflow-hidden bg-[#0e0d0b]"
    >
      {/* 
        ========================================================================
        IMMERSIVE ARCHITECTURAL PROPERTY CANVAS & EXPANDED GRADIENT COVER SHADE
        - The house spans wide across the hero composition
        - The dark-brown / espresso gradient cover shade takes MORE space across the left and center
        - Seamless feathering: NO vertical card boundary or split-screen division
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        
        {/* Full Architectural Property Visual with Restrained Slow Camera Push */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentView.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{
              opacity: 1,
              scale: [1.02, 1.05], // very restrained 3-4% push-in
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.7, ease: 'easeInOut' },
              scale: {
                duration: 22,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentView.image}
              alt={currentView.title}
              className="w-full h-full object-cover object-[75%_center] lg:object-[82%_center]"
            />
          </motion.div>
        </AnimatePresence>

        {/* 
          EXPANDED GRADIENT COVER / SHADE:
          Takes more space (reaching ~75% to 80% across the hero).
          Layers warm espresso / obsidian tones to ensure crystal-clear text readability
          while allowing the illuminated villa to emerge organically on the right.
        */}
        
        {/* Layer 1: Primary horizontal dark brown & black gradient shade covering 75-80% of width */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0d0b] via-[#0e0d0b]/98 via-40% via-[#120f0c]/90 via-65% via-[#14100c]/60 via-80% to-transparent" />

        {/* Layer 2: Deep espresso undertone behind copy area for rich architectural mood */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[68%] bg-gradient-to-r from-[#0e0d0b] via-[#100d09]/95 via-55% to-transparent" />

        {/* Layer 3: Warm architectural amber glow reflecting interior window lighting */}
        <motion.div
          animate={{
            opacity: [0.15, 0.32, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute inset-y-0 right-0 w-full lg:w-[60%] bg-radial from-amber-600/20 via-transparent to-transparent mix-blend-screen pointer-events-none"
        />

        {/* Layer 4: Top and bottom atmospheric vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0b] via-transparent via-50% to-[#0e0d0b]/70" />
      </div>

      {/* 
        ========================================================================
        HERO CONTENT CONTAINER (Unified Composition)
        ========================================================================
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="relative min-h-[460px] sm:min-h-[500px] md:min-h-[540px] flex flex-col justify-center">
          
          {/* LEFT AREA: Copy, Headline, Subtitle, and Two CTAs */}
          <div className="max-w-xl lg:max-w-[560px] space-y-5 sm:space-y-6">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2"
            >
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#d4af37] uppercase">
                YOUR HOME. YOUR VISION. YOUR JOURNEY.
              </span>
            </motion.div>

            {/* Headline Sequence: Sophisticated line-height footprint */}
            <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-[-0.015em] text-[#f5f3ef]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="font-normal"
              >
                Build the Home
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-normal"
              >
                You Can Already
              </motion.div>
              {/* Gold headline portion follows slightly later */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.38 }}
                className="font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-[#e5c07b] via-[#fae6ab] to-[#c59b27] drop-shadow-[0_2px_18px_rgba(212,175,55,0.4)]"
              >
                See in Your Head.
              </motion.div>
            </div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm sm:text-base text-[#b8b09f] max-w-lg leading-relaxed font-light"
            >
              Explore TVICL projects, configure your dream home, discover materials,
              experience smart-home technology, follow construction progress and connect with our team
              when you're ready.
            </motion.p>

            {/* Primary & Secondary CTAs Only */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <button
                onClick={scrollToIntentRouter}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-sm sm:text-[15px] tracking-wide hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-[#c59b27]/25 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#131210]" />
                <span>Start My Home Journey</span>
                <ArrowRight className="w-4 h-4 text-[#131210]" />
              </button>

              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#3d382d] bg-[#161410]/80 text-[#e6e2d8] font-medium text-sm sm:text-[15px] hover:border-[#c59b27]/70 hover:bg-[#201d17] transition-all cursor-pointer backdrop-blur-sm"
              >
                <Play className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
                <span>Explore Projects</span>
              </button>
            </motion.div>
          </div>

          {/* 
            ====================================================================
            FLOATING ₦85M INFORMATION CARD:
            Positioned as a translucent overlay attached to the house on the right.
            Fades/slides in smoothly 550ms after the house.
            Content smoothly updates with the active perspective slide.
            ====================================================================
          */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
            className="mt-8 lg:mt-0 lg:absolute lg:top-2 lg:right-0 w-full sm:w-[290px] bg-[#12100d]/80 backdrop-blur-xl border border-[#3a3427]/80 rounded-xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] z-20 group"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wider text-[#a8a090] font-medium">
                {currentView.title}
              </p>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c59b27]/20 text-[#e5c07b] font-semibold uppercase">
                {currentView.label}
              </span>
            </div>
            
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#e5c07b]">
                {currentView.price}
              </span>
            </div>
            <span className="text-[11px] text-[#7d7565] block mb-3">
              {currentView.subtitle}
            </span>

            {/* House Attributes List */}
            <div className="space-y-1.5 pt-2.5 border-t border-[#29241c] text-xs text-[#d1cbc0]">
              <div className="flex items-center gap-2">
                <Bed className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{currentView.bedrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{currentView.bathrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{currentView.style}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gem className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{currentView.finish}</span>
              </div>
            </div>

            {/* Direct Configurator forward button */}
            <button
              onClick={scrollToConfigurator}
              title="Customize this model in Dream Home Studio"
              className="mt-3.5 w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#c59b27]/20 border border-[#c59b27]/40 text-[#f5f3ef] hover:bg-[#c59b27]/30 text-xs font-medium transition-all group/btn cursor-pointer"
            >
              <span>Configure in Studio</span>
              <div className="w-5 h-5 rounded-full bg-[#d4af37] text-[#131210] flex items-center justify-center group-hover/btn:translate-x-0.5 transition-transform">
                <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </button>
          </motion.div>

          {/* 
            ====================================================================
            HERO SLIDE CONTROLS & PROPERTY-VIEW SELECTOR:
            Includes:
            - Interactive Slide Chevrons (Prev / Next)
            - Progress bar indicator for slide auto-advance
            - Refined thumbnails: Exterior | Interior | Living
            - Selected thumbnail gets the gold outline.
            - Crossfade & slide transition
            ====================================================================
          */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-6 lg:mt-0 lg:absolute lg:bottom-1 lg:right-0 z-20 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            {/* Slide Navigation Chevrons & Counter */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#110f0c]/90 backdrop-blur-md border border-[#332e24] shadow-lg text-xs text-[#a69e8e]">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#242019] hover:text-[#e5c07b] text-[#b8b09f] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="font-mono text-[11px] text-[#e5c07b] px-1 font-semibold">
                0{activeSlideIdx + 1} / 0{HERO_PERSPECTIVES.length}
              </span>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#242019] hover:text-[#e5c07b] text-[#b8b09f] transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Perspective Selectors */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#110f0c]/90 backdrop-blur-md border border-[#332e24] shadow-xl">
              {HERO_PERSPECTIVES.map((item, index) => {
                const isSelected = activeSlideIdx === index;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSlideIdx(index)}
                    aria-label={`Switch to ${item.label} view`}
                    className={`group/thumb relative rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer text-left ${
                      isSelected
                        ? 'border-[#e5c07b] shadow-[0_0_12px_rgba(212,175,55,0.45)] ring-1 ring-[#e5c07b]/40 scale-102'
                        : 'border-transparent opacity-65 hover:opacity-100 hover:border-[#4d4434]'
                    }`}
                  >
                    <div className="w-16 sm:w-20 h-11 sm:h-12 relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#e5c07b]" />
                      )}

                      <span className="absolute bottom-1 left-1.5 text-[10px] font-semibold text-[#f5f3ef] tracking-wide">
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* 
          ======================================================================
          CAPABILITY / TRUST ROW (Subtle & understated below CTAs)
          Real Projects & Construction · Premium Materials · Smart Home Technology · AI-Powered Experience · Expert Support
          ======================================================================
        */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-10 sm:mt-12 pt-5 sm:pt-6 border-t border-[#26221a]/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 text-[#a69e8e]"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1a1814] border border-[#2e2a22] flex items-center justify-center text-[#d4af37] flex-shrink-0">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5f3ef] leading-tight">Real Projects</p>
              <p className="text-[10px] text-[#736c5f]">& Construction</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1a1814] border border-[#2e2a22] flex items-center justify-center text-[#d4af37] flex-shrink-0">
              <Gem className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5f3ef] leading-tight">Premium</p>
              <p className="text-[10px] text-[#736c5f]">Materials</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1a1814] border border-[#2e2a22] flex items-center justify-center text-[#d4af37] flex-shrink-0">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5f3ef] leading-tight">Smart Home</p>
              <p className="text-[10px] text-[#736c5f]">Technology</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1a1814] border border-[#2e2a22] flex items-center justify-center text-[#d4af37] flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5f3ef] leading-tight">AI-Powered</p>
              <p className="text-[10px] text-[#736c5f]">Experience</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
            <div className="w-7 h-7 rounded-lg bg-[#1a1814] border border-[#2e2a22] flex items-center justify-center text-[#d4af37] flex-shrink-0">
              <Headphones className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5f3ef] leading-tight">Expert Support</p>
              <p className="text-[10px] text-[#736c5f]">Anytime</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

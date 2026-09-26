import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, User, ArrowRight, Menu, X, Sparkles, Compass, Home, HardHat, Layers, Cpu, BookOpen, MessageSquare } from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { TVICLLogo } from './TVICLLogo';

export const Header: React.FC = () => {
  const {
    totalSavedCount,
    isPulseHeaderBadge,
    setIsConceptDrawerOpen,
    setIsConsultationModalOpen,
    setIsSearchModalOpen,
    markStageComplete,
  } = useBuyerJourney();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    markStageComplete('Explore');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#0e0d0b]/95 backdrop-blur-md border-b border-[#28251e] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            : 'bg-gradient-to-b from-[#0e0d0b]/95 via-[#0e0d0b]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo */}
            <a
              href="#"
              className="flex items-center group focus:outline-none flex-shrink-0"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="TVICL - The Valley Investment Company Limited"
            >
              <TVICLLogo variant="horizontal" size="md" showSubtitle={true} />
            </a>

            {/* Desktop Navigation Links (>= lg) */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-sm font-medium text-[#b5af9f]">
              <button
                onClick={() => scrollToSection('discover')}
                className="hover:text-[#f5f3ef] transition-colors duration-200 cursor-pointer"
              >
                Discover
              </button>
              <button
                onClick={() => scrollToSection('dream-home')}
                className="hover:text-[#f5f3ef] transition-colors duration-200 cursor-pointer"
              >
                Build Your Home
              </button>
              <button
                onClick={() => scrollToSection('construction-pulse')}
                className="hover:text-[#f5f3ef] transition-colors duration-200 cursor-pointer"
              >
                Our Projects
              </button>
              <button
                onClick={() => scrollToSection('materials')}
                className="hover:text-[#f5f3ef] transition-colors duration-200 cursor-pointer"
              >
                Materials
              </button>
              <button
                onClick={() => scrollToSection('smart-home')}
                className="hover:text-[#f5f3ef] transition-colors duration-200 cursor-pointer"
              >
                Smart Home
              </button>
              <button
                onClick={() => scrollToSection('ecosystem')}
                className="hover:text-[#f5f3ef] transition-colors duration-200 cursor-pointer"
              >
                How It Works
              </button>
            </nav>

            {/* Right actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                aria-label="Search estates, models and materials"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#b5af9f] hover:text-[#f5f3ef] hover:bg-[#221f1a] transition-all duration-200 cursor-pointer flex-shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* My Concepts (X) Button / Drop Target - Responsive */}
              <button
                id="my-concepts-badge"
                onClick={() => setIsConceptDrawerOpen(true)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex-shrink-0 ${
                  isPulseHeaderBadge
                    ? 'border-[#e5c07b] bg-[#c59b27]/30 text-[#f5f3ef] scale-105 shadow-[0_0_20px_rgba(212,175,55,0.7)]'
                    : totalSavedCount > 0
                    ? 'border-[#c59b27]/70 bg-[#1e1b14] text-[#e5c07b] hover:bg-[#2a251b] hover:border-[#e5c07b]'
                    : 'border-[#332f26] bg-[#161410] text-[#c7c0b0] hover:border-[#4d4638]'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-colors ${
                    totalSavedCount > 0 ? 'text-[#e5c07b] fill-[#e5c07b]' : 'text-[#968e7d]'
                  }`}
                />
                {/* On mobile: compact concept count to prevent overflow; full text on sm: */}
                <span className="hidden sm:inline whitespace-nowrap font-medium">
                  My Concepts ({totalSavedCount})
                </span>
                <span className="sm:hidden font-semibold text-xs text-[#e5c07b]">
                  {totalSavedCount}
                </span>
                {totalSavedCount > 0 && (
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e5c07b] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#e5c07b]"></span>
                  </span>
                )}
              </button>

              {/* User Avatar (Desktop & Tablet) */}
              <button
                onClick={() => setIsConceptDrawerOpen(true)}
                aria-label="User Account"
                className="hidden md:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1a16] border border-[#332f26] items-center justify-center text-[#b5af9f] hover:text-[#f5f3ef] hover:border-[#c59b27]/50 transition-all duration-200 cursor-pointer flex-shrink-0"
              >
                <User className="w-4 h-4" />
              </button>

              {/* Start Your Journey CTA (sm and above) */}
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] text-xs sm:text-sm font-semibold tracking-wide hover:brightness-110 active:scale-98 transition-all duration-200 shadow-md shadow-[#c59b27]/20 cursor-pointer flex-shrink-0"
              >
                <span>Start Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile menu button - ALWAYS visible on < lg, clearly styled with gold border */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-[#1a1713] border border-[#d4af37]/40 text-[#e5c07b] hover:bg-[#252018] active:scale-95 transition-all shadow-md flex-shrink-0 cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#e5c07b]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#e5c07b]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 
        ========================================================================
        MOBILE NAVIGATION DRAWER OVERLAY
        Ensures full visibility, smooth animations, and direct access to all pages
        ========================================================================
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Dark blur backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-14 sm:top-16 inset-x-0 max-h-[calc(100vh-4rem)] overflow-y-auto bg-[#12100d] border-b border-[#2d281f] shadow-2xl p-5 sm:p-6 space-y-6"
            >
              {/* Mobile Drawer Brand Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#252119]">
                <TVICLLogo variant="horizontal" size="sm" />
                <span className="text-[10px] uppercase tracking-widest text-[#a8905b] font-medium border border-[#a8905b]/30 px-2 py-0.5 rounded-full">
                  West Africa
                </span>
              </div>

              {/* Intent prompt banner */}
              <div
                onClick={() => scrollToSection('intent-router')}
                className="p-3.5 rounded-xl bg-gradient-to-r from-[#201c15] to-[#161410] border border-[#d4af37]/30 flex items-center justify-between cursor-pointer hover:border-[#d4af37] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#c59b27]/20 text-[#e5c07b] flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">What brings you today?</p>
                    <p className="text-xs text-[#cfc8ba]">Choose your personalized pathway</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#e5c07b]" />
              </div>

              {/* Navigation Links with Icons */}
              <nav className="space-y-1">
                <button
                  onClick={() => scrollToSection('discover')}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-sm font-medium text-[#f5f3ef] hover:bg-[#1f1b15] hover:text-[#e5c07b] transition-all"
                >
                  <Home className="w-4 h-4 text-[#d4af37]" />
                  <span>Discover TVICL Luxury</span>
                </button>

                <button
                  onClick={() => scrollToSection('dream-home')}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-sm font-medium text-[#f5f3ef] hover:bg-[#1f1b15] hover:text-[#e5c07b] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>Dream Home Studio (Configurator)</span>
                </button>

                <button
                  onClick={() => scrollToSection('construction-pulse')}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-sm font-medium text-[#f5f3ef] hover:bg-[#1f1b15] hover:text-[#e5c07b] transition-all"
                >
                  <HardHat className="w-4 h-4 text-[#d4af37]" />
                  <span>Our Projects & Construction Pulse</span>
                </button>

                <button
                  onClick={() => scrollToSection('materials')}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-sm font-medium text-[#f5f3ef] hover:bg-[#1f1b15] hover:text-[#e5c07b] transition-all"
                >
                  <Layers className="w-4 h-4 text-[#d4af37]" />
                  <span>Materials & Surface Stories</span>
                </button>

                <button
                  onClick={() => scrollToSection('smart-home')}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-sm font-medium text-[#f5f3ef] hover:bg-[#1f1b15] hover:text-[#e5c07b] transition-all"
                >
                  <Cpu className="w-4 h-4 text-[#d4af37]" />
                  <span>Smart Home Technology Simulator</span>
                </button>

                <button
                  onClick={() => scrollToSection('ecosystem')}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-sm font-medium text-[#f5f3ef] hover:bg-[#1f1b15] hover:text-[#e5c07b] transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#d4af37]" />
                  <span>How It Works & Buyer Journey</span>
                </button>
              </nav>

              {/* Action Buttons in Mobile Drawer */}
              <div className="pt-4 border-t border-[#28251e] space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsConceptDrawerOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#1c1a16] border border-[#d4af37]/40 text-sm text-[#e5c07b] hover:bg-[#252018] transition-all"
                >
                  <span className="flex items-center gap-2.5 font-medium">
                    <Heart className="w-4 h-4 fill-[#e5c07b]" />
                    My Concept Board
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#c59b27]/25 text-xs font-semibold">
                    {totalSavedCount} item{totalSavedCount !== 1 ? 's' : ''} saved
                  </span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsConsultationModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-sm shadow-lg shadow-[#c59b27]/20 active:scale-98 transition-all"
                >
                  <span>Start Your Home Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-[#787164]">
                    TVICL Concierge: +234 800 000 8842 · WhatsApp Available
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bed,
  Bath,
  Maximize2,
  Car,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { BedroomCount, ArchitecturalStyle } from '../types';
import { AnimatedPriceCounter } from './AnimatedPriceCounter';

const BEDROOM_OPTIONS: BedroomCount[] = [3, 4, 5, 6];
const STYLE_OPTIONS: ArchitecturalStyle[] = ['Modern', 'Classic', 'Contemporary'];

export const DreamHomeStudio: React.FC = () => {
  const {
    currentBedrooms,
    setBedrooms,
    currentStyle,
    setStyle,
    currentHouse,
    savedHouse,
    saveCurrentHouse,
    setIs3DModalOpen,
  } = useBuyerJourney();

  const [activeThumbIdx, setActiveThumbIdx] = useState(0);
  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const isCurrentSaved =
    savedHouse !== null &&
    savedHouse.bedrooms === currentBedrooms &&
    savedHouse.style === currentStyle;

  const handleSaveConcept = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    saveCurrentHouse(coords);
  };

  const imagesList = [currentHouse.image, ...currentHouse.additionalImages];
  const activeImage = imagesList[activeThumbIdx] || currentHouse.image;

  const handleNextThumb = () => {
    setActiveThumbIdx((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevThumb = () => {
    setActiveThumbIdx((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  return (
    <div
      id="dream-home"
      className="rounded-2xl border border-[#2b271f] bg-[#14120e] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
    >
      {/* Decorative subtle ambient backdrop glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c59b27]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="mb-6">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
          DREAM HOME STUDIO
        </span>
        <h3 className="mt-1 text-2xl sm:text-3xl font-serif text-[#f5f3ef] leading-tight">
          See it. Configure it. <br />
          <span className="italic text-[#e5c07b]">Make it yours.</span>
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#a39b8c] max-w-lg">
          Try a quick configuration to see a live estimate and get a feel for your dream home.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Interactive Controls & Live Consequence */}
        <div className="lg:col-span-6 space-y-6">
          {/* Bedrooms Selector */}
          <div>
            <label className="block text-xs font-medium text-[#b5af9f] uppercase tracking-wider mb-2">
              Bedrooms
            </label>
            <div className="grid grid-cols-4 gap-2">
              {BEDROOM_OPTIONS.map((count) => {
                const isSelected = currentBedrooms === count;
                return (
                  <button
                    key={count}
                    onClick={() => {
                      setBedrooms(count);
                      setActiveThumbIdx(0);
                    }}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] shadow-md shadow-[#c59b27]/30 scale-102'
                        : 'bg-[#1b1914] border border-[#302c23] text-[#cfc7b6] hover:border-[#4f483a] hover:text-[#f5f3ef]'
                    }`}
                  >
                    {count === 6 ? '6+' : count}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style Selector */}
          <div>
            <label className="block text-xs font-medium text-[#b5af9f] uppercase tracking-wider mb-2">
              Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {STYLE_OPTIONS.map((st) => {
                const isSelected = currentStyle === st;
                return (
                  <button
                    key={st}
                    onClick={() => {
                      setStyle(st);
                      setActiveThumbIdx(0);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] shadow-md shadow-[#c59b27]/30 scale-102'
                        : 'bg-[#1b1914] border border-[#302c23] text-[#cfc7b6] hover:border-[#4f483a] hover:text-[#f5f3ef]'
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Dynamic Price & Investment Consequence */}
          <div className="p-4 rounded-xl bg-[#1a1712] border border-[#332d22]">
            <span className="text-xs text-[#a69e8e] block font-medium">
              Estimated Investment
            </span>
            <div className="mt-1 text-2xl sm:text-3xl font-serif font-bold text-[#e5c07b] tracking-tight">
              <AnimatedPriceCounter value={currentHouse.price} />
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-[#787060]">
              <span>Based on your current selection</span>
              <span>{currentHouse.areaSqm} m² Total Footprint</span>
            </div>

            {/* Quick architectural spec badges */}
            <div className="mt-3 pt-3 border-t border-[#29241b] grid grid-cols-3 gap-2 text-xs text-[#c9c2b3]">
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{currentHouse.bedrooms} En-suite</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{currentHouse.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{currentHouse.parkingSpaces} Garage</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: 3D Model & Save this concept */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={() => setIs3DModalOpen(true)}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#c59b27]/20 cursor-pointer"
            >
              <span>View 3D Model</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              ref={saveBtnRef}
              onClick={handleSaveConcept}
              className={`w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isCurrentSaved
                  ? 'border-[#e5c07b] bg-[#c59b27]/25 text-[#f5f3ef]'
                  : 'border-[#383227] bg-[#1a1712] text-[#d6cfbf] hover:border-[#c59b27]/80 hover:text-[#f5f3ef]'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform duration-300 ${
                  isCurrentSaved
                    ? 'text-[#e5c07b] fill-[#e5c07b] scale-125 animate-bounce'
                    : 'text-[#968e7d]'
                }`}
              />
              <span>{isCurrentSaved ? 'Concept Saved' : 'Save this concept'}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Architectural Crossfade Visual & Carousel Thumbnails */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative h-64 sm:h-76 md:h-84 rounded-xl overflow-hidden border border-[#2e2a22] bg-[#100e0b] shadow-xl">
            {/* 500-700ms Architectural Visual Crossfade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={`${currentHouse.bedrooms} Bedroom ${currentHouse.style}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Architectural model tag */}
            <div className="absolute top-3 left-3 bg-[#110f0c]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#3b3528] text-[11px] font-medium text-[#e5c07b]">
              {currentHouse.bedrooms}-Bed {currentHouse.style} Archetype
            </div>

            {/* Quick floor plan label */}
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <p className="text-xs text-[#e6e1d5] font-serif font-medium line-clamp-1 drop-shadow-md">
                {currentHouse.tagline}
              </p>
              <p className="text-[11px] text-[#a69e8e] line-clamp-1">
                {currentHouse.floorPlanSummary}
              </p>
            </div>
          </div>

          {/* Carousel thumbnails underneath with prev/next arrows */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={handlePrevThumb}
              className="w-7 h-7 rounded-full bg-[#1b1914] border border-[#332e24] flex items-center justify-center text-[#b8b0a0] hover:text-[#f5f3ef] hover:border-[#c59b27] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 overflow-x-auto py-1 px-1">
              {imagesList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumbIdx(idx)}
                  className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden border transition-all cursor-pointer flex-shrink-0 ${
                    activeThumbIdx === idx
                      ? 'border-[#e5c07b] scale-105 shadow-[0_0_8px_rgba(212,175,55,0.5)]'
                      : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Perspective ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleNextThumb}
              className="w-7 h-7 rounded-full bg-[#1b1914] border border-[#332e24] flex items-center justify-center text-[#b8b0a0] hover:text-[#f5f3ef] hover:border-[#c59b27] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

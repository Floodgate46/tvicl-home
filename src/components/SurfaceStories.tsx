import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, ArrowRight, Sparkles, Sliders } from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { FINISH_STORIES } from '../data/mockData';
import { FinishStory, FinishPersonality } from '../types';

export const SurfaceStories: React.FC = () => {
  const {
    activeFinishStory,
    setActiveFinishStory,
    saveFinishStoryToConcepts,
    markStageComplete,
    setIsConceptDrawerOpen,
  } = useBuyerJourney();

  const [savedLocally, setSavedLocally] = useState(false);

  const handleSelectStory = (story: FinishPersonality) => {
    setActiveFinishStory(story);
    markStageComplete('Engage');
  };

  const handleSaveFinish = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    saveFinishStoryToConcepts(activeFinishStory, coords);
    setSavedLocally(true);
    setTimeout(() => setSavedLocally(false), 2000);
  };

  return (
    <div
      id="surface-stories"
      className="rounded-2xl border border-[#2b271f] bg-[#14120e] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
    >
      {/* Decorative ambient aura */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-amber-600/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
            Surface Stories
          </span>
        </div>
        <h3 className="mt-1 text-2xl sm:text-3xl font-serif text-[#f5f3ef]">
          Design Finishes That Tell Your Story
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#a39b8c] max-w-md">
          Discover how different finishes create unique moods and identities for your space.
        </p>
      </div>

      {/* 3 Finish Personalities Selector: Warm | Modern | Statement */}
      <div className="my-5">
        <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-[#191712] border border-[#2e2920]">
          {FINISH_STORIES.map((story) => {
            const isSelected = activeFinishStory.id === story.id;
            return (
              <button
                key={story.id}
                onClick={() => handleSelectStory(story)}
                className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer truncate ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] shadow-md shadow-[#c59b27]/30'
                    : 'text-[#b5af9f] hover:text-[#f5f3ef] hover:bg-[#221f19]'
                }`}
              >
                {story.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cinematic Room Visual with Smooth Style Crossfade */}
      <div className="relative rounded-xl overflow-hidden border border-[#332e24] bg-black h-56 sm:h-64 mb-5">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeFinishStory.id}
            src={activeFinishStory.primaryImage}
            alt={activeFinishStory.title}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0b] via-transparent to-transparent pointer-events-none" />

        {/* Overlay info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div>
            <h4 className="text-sm font-serif font-semibold text-[#f5f3ef] drop-shadow">
              {activeFinishStory.title}
            </h4>
            <p className="text-[11px] text-[#cfc7b6] drop-shadow">
              {activeFinishStory.subtitle}
            </p>
          </div>

          {/* Palette Swatches */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#110f0c]/80 backdrop-blur-md border border-[#3b3528]">
            {activeFinishStory.paletteColors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-4 border-t border-[#262118] flex items-center justify-between">
        <button
          onClick={handleSaveFinish}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#c59b27]/20 cursor-pointer"
        >
          {savedLocally ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          <span>{savedLocally ? 'Finish Story Saved' : 'Create my finish story'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <span className="text-xs text-[#a69e8e]">
          {activeFinishStory.ambienceLighting}
        </span>
      </div>
    </div>
  );
};

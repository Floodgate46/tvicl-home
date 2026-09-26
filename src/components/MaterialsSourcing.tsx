import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Plus, Check, ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { LUXURY_MATERIALS } from '../data/mockData';
import { MaterialItem } from '../types';

export const MaterialsSourcing: React.FC = () => {
  const {
    savedMaterials,
    addMaterialToConcepts,
    removeMaterialFromConcepts,
    isMaterialSaved,
    setIsConceptDrawerOpen,
    markStageComplete,
  } = useBuyerJourney();

  const [hoveredMatId, setHoveredMatId] = useState<string | null>(null);

  const handleToggleMaterial = (mat: MaterialItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMaterialSaved(mat.id)) {
      removeMaterialFromConcepts(mat.id);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const coords = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      addMaterialToConcepts(mat, coords);
    }
  };

  return (
    <div
      id="materials"
      className="rounded-2xl border border-[#2b271f] bg-[#14120e] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
    >
      {/* Decorative ambient aura */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-[#c59b27]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
            Materials & Sourcing
          </span>
        </div>
        <h3 className="mt-1 text-2xl sm:text-3xl font-serif text-[#f5f3ef]">
          Build Your Material Package
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#a39b8c] max-w-md">
          Explore premium materials, finishes and textures. Create a custom tactile package
          for your architectural spaces.
        </p>
      </div>

      {/* Interactive Material Swatches Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 my-6">
        {LUXURY_MATERIALS.slice(0, 6).map((mat) => {
          const isSaved = isMaterialSaved(mat.id);
          const isHovered = hoveredMatId === mat.id;

          return (
            <motion.div
              key={mat.id}
              onMouseEnter={() => setHoveredMatId(mat.id)}
              onMouseLeave={() => setHoveredMatId(null)}
              className="relative h-44 rounded-xl overflow-hidden border border-[#2b261e] bg-[#181611] group cursor-pointer shadow-md"
            >
              {/* Texture moves forward subtly on hover */}
              <motion.img
                src={mat.image}
                alt={mat.name}
                animate={{
                  scale: isHovered ? 1.08 : 1,
                  y: isHovered ? -3 : 0,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full h-full object-cover"
              />

              {/* Glassmorphic Overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-[#0e0d0b] via-[#0e0d0b]/80 to-transparent p-3 flex flex-col justify-between transition-opacity duration-300 ${
                  isHovered || isSaved ? 'opacity-100' : 'opacity-85'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-[#d4af37] border border-[#d4af37]/30 font-medium">
                    {mat.finishType.split(' ')[0]}
                  </span>
                  {isSaved && (
                    <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#131210] flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Bottom Details */}
                <div>
                  <h4 className="text-xs font-serif font-semibold text-[#f5f3ef] leading-tight">
                    {mat.name}
                  </h4>
                  <p className="text-[10px] text-[#b8b09f] mt-0.5">
                    {mat.rooms.slice(0, 2).join(' · ')}
                  </p>
                  <p className="text-[11px] font-mono text-[#e5c07b] font-medium mt-1">
                    {mat.pricePerSqmFormatted}
                  </p>

                  {/* Microinteraction Button: + Add to My Concepts */}
                  <button
                    onClick={(e) => handleToggleMaterial(mat, e)}
                    className={`mt-2 w-full py-1.5 px-2 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-[#c59b27]/30 border border-[#e5c07b] text-[#f5f3ef]'
                        : 'bg-[#1e1b15]/90 border border-[#3b3427] text-[#e6e2d8] hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-[#131210]'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-3 h-3 text-[#e5c07b]" />
                        <span>Added to Palette</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>+ Add to Concepts</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="pt-4 border-t border-[#262118] flex items-center justify-between">
        <button
          onClick={() => {
            markStageComplete('Save');
            setIsConceptDrawerOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#c59b27]/20 cursor-pointer"
        >
          <span>Build my material package</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <span className="text-xs text-[#a69e8e]">
          {savedMaterials.length} materials selected
        </span>
      </div>
    </div>
  );
};

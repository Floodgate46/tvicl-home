import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, X, Home, Layers, Activity, ArrowRight } from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { LUXURY_MATERIALS, LIVE_CONSTRUCTION_PROJECTS } from '../data/mockData';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    setSelectedInspectionProject,
    setIs3DModalOpen,
    markStageComplete,
  } = useBuyerJourney();

  const [query, setQuery] = useState('');

  if (!isSearchModalOpen) return null;

  const filteredMaterials = LUXURY_MATERIALS.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = LIVE_CONSTRUCTION_PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.location.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectProject = (p: (typeof LIVE_CONSTRUCTION_PROJECTS)[0]) => {
    setIsSearchModalOpen(false);
    setSelectedInspectionProject(p);
  };

  const handleSelectMaterial = () => {
    setIsSearchModalOpen(false);
    const el = document.getElementById('materials');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsSearchModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Search Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative w-full max-w-2xl bg-[#14120e] border border-[#332e24] rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        {/* Search Bar Input */}
        <div className="p-4 border-b border-[#28241d] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#d4af37]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search estates, archetypes, materials (e.g. Sunrise, Marble, 5 Bedroom)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#f5f3ef] placeholder-[#787060] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#8c8474] hover:text-[#f5f3ef]"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="w-7 h-7 rounded-lg bg-[#1c1913] flex items-center justify-center text-[#8c8474] hover:text-[#f5f3ef]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {/* Quick Categories */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8c8474] block mb-2">
              Construction Sites
            </span>
            <div className="space-y-1.5">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProject(p)}
                  className="p-2.5 rounded-lg border border-[#262118] bg-[#181611] hover:border-[#c59b27] flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="text-xs font-medium text-[#f5f3ef] group-hover:text-[#e5c07b]">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-[#736b5c]">{p.location}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#736b5c] group-hover:text-[#e5c07b]" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8c8474] block mb-2">
              Luxury Materials
            </span>
            <div className="grid grid-cols-2 gap-2">
              {filteredMaterials.slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  onClick={handleSelectMaterial}
                  className="p-2.5 rounded-lg border border-[#262118] bg-[#181611] hover:border-[#c59b27] flex items-center gap-2.5 cursor-pointer group"
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#f5f3ef] truncate group-hover:text-[#e5c07b]">
                      {m.name}
                    </p>
                    <p className="text-[10px] text-[#736b5c] truncate">{m.origin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

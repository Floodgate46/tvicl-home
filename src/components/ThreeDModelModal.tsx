import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Compass,
  Layers,
  Sun,
  Moon,
  RotateCw,
  Eye,
  Maximize2,
  Heart,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';

const PERSPECTIVE_VIEWS = [
  {
    id: 'front',
    label: 'North Front Elevation',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    notes: 'Double-volume cantilevered overhang with warm travertine & PVD titanium finishes.',
  },
  {
    id: 'terrace',
    label: 'Rear Infinity Pool Lanai',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    notes: 'Seamless indoor-outdoor sliding acoustic glass partitions and heated infinity edge.',
  },
  {
    id: 'aerial',
    label: 'Aerial Architectural Plan',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    notes: 'Central biophilic atrium offering cross-ventilation designed for West African coastal airflow.',
  },
  {
    id: 'penthouse',
    label: 'Master Sky Pavilion',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    notes: '80m² private presidential sanctuary with recessed reading lounge and panoramic views.',
  },
];

const FLOOR_LEVELS = [
  { id: 'ground', label: 'Level 01: Great Room & Lanai', area: '310 m²' },
  { id: 'first', label: 'Level 02: 4 En-suite Suites', area: '230 m²' },
  { id: 'penthouse', label: 'Level 03: Rooftop Club & Master Wing', area: '140 m²' },
];

export const ThreeDModelModal: React.FC = () => {
  const { is3DModalOpen, setIs3DModalOpen, currentHouse, saveCurrentHouse } = useBuyerJourney();
  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [activeFloor, setActiveFloor] = useState('ground');
  const [lightingMode, setLightingMode] = useState<'day' | 'golden' | 'dusk'>('dusk');
  const [savedLocally, setSavedLocally] = useState(false);

  if (!is3DModalOpen) return null;

  const currentView = PERSPECTIVE_VIEWS[activeViewIdx];

  const handleSave = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    saveCurrentHouse({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSavedLocally(true);
    setTimeout(() => setSavedLocally(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIs3DModalOpen(false)}
        className="fixed inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-[#14120e] border border-[#332e24] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[92vh]"
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#28241d] flex items-center justify-between bg-[#110f0c]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1d1a14] border border-[#3d3627] flex items-center justify-center text-[#e5c07b]">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#f5f3ef]">
                3D Architectural Inspector · {currentHouse.bedrooms}-Bed {currentHouse.style}
              </h3>
              <p className="text-xs text-[#8c8474]">
                Interactive 360° elevations, floor-plate segregation & daylight simulation
              </p>
            </div>
          </div>

          <button
            onClick={() => setIs3DModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-[#1a1813] border border-[#332e24] flex items-center justify-center text-[#b8b0a0] hover:text-[#f5f3ef] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden min-h-[420px]">
          
          {/* Left Canvas Preview */}
          <div className="lg:col-span-8 relative bg-black flex items-center justify-center overflow-hidden min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${currentView.id}-${lightingMode}`}
                src={currentView.image}
                alt={currentView.label}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Lighting Mode Shading Overlay */}
            <div
              className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                lightingMode === 'golden'
                  ? 'bg-gradient-to-t from-amber-600/35 via-amber-500/10 to-transparent mix-blend-color-burn'
                  : lightingMode === 'dusk'
                  ? 'bg-gradient-to-t from-indigo-950/60 via-purple-950/20 to-transparent mix-blend-multiply'
                  : 'bg-white/10 mix-blend-soft-light'
              }`}
            />

            {/* Floating Perspective Badge */}
            <div className="absolute top-4 left-4 bg-[#110f0c]/85 border border-[#3b3427] backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-[#f5f3ef] flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-[#e5c07b]" />
              <span>{currentView.label}</span>
            </div>

            {/* Sun-Study Lighting Selector Buttons */}
            <div className="absolute bottom-4 left-4 bg-[#110f0c]/85 border border-[#3b3427] backdrop-blur-md p-1 rounded-xl flex items-center gap-1 text-xs">
              <button
                onClick={() => setLightingMode('day')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lightingMode === 'day' ? 'bg-[#c59b27] text-[#131210] font-semibold' : 'text-[#a69e8e]'
                }`}
              >
                10 AM Sun
              </button>
              <button
                onClick={() => setLightingMode('golden')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lightingMode === 'golden' ? 'bg-[#c59b27] text-[#131210] font-semibold' : 'text-[#a69e8e]'
                }`}
              >
                5:30 PM Golden
              </button>
              <button
                onClick={() => setLightingMode('dusk')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lightingMode === 'dusk' ? 'bg-[#c59b27] text-[#131210] font-semibold' : 'text-[#a69e8e]'
                }`}
              >
                8 PM Dusk Glow
              </button>
            </div>
          </div>

          {/* Right Control Sidebar */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-[#16140f] border-t lg:border-t-0 lg:border-l border-[#28241d] flex flex-col justify-between overflow-y-auto space-y-6">
            
            {/* Perspective View Angle Selector */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0] block mb-2.5">
                Camera Elevation
              </span>
              <div className="space-y-1.5">
                {PERSPECTIVE_VIEWS.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveViewIdx(idx)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                      activeViewIdx === idx
                        ? 'border-[#e5c07b] bg-[#221d15] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#1a1712] text-[#8e8574] hover:text-[#d6cfbf]'
                    }`}
                  >
                    <p className="font-semibold">{v.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Floor Breakdown */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0] block mb-2.5">
                Floor-plate Segregation
              </span>
              <div className="space-y-1.5">
                {FLOOR_LEVELS.map((fl) => (
                  <button
                    key={fl.id}
                    onClick={() => setActiveFloor(fl.id)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${
                      activeFloor === fl.id
                        ? 'border-[#e5c07b] bg-[#221d15] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#1a1712] text-[#8e8574]'
                    }`}
                  >
                    <span>{fl.label}</span>
                    <span className="font-mono text-[#e5c07b] text-[11px]">{fl.area}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Engineer Notes */}
            <div className="p-3.5 rounded-xl bg-[#191711] border border-[#2e2920] text-xs text-[#a69e8e]">
              <p className="font-semibold text-[#f5f3ef] mb-1">Architectural Analysis</p>
              <p className="text-[11px] leading-relaxed">
                {currentView.notes}
              </p>
            </div>

            {/* Action Save Button */}
            <div className="pt-2">
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#c59b27]/20 cursor-pointer"
              >
                {savedLocally ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                <span>{savedLocally ? 'Added to Concept Board' : 'Save 3D Archetype'}</span>
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Heart,
  Home,
  Layers,
  Cpu,
  Bookmark,
  Sparkles,
  ArrowRight,
  Trash2,
  Share2,
  Download,
  Calendar,
  Bell,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { AnimatedPriceCounter } from './AnimatedPriceCounter';
import { TVICLLogo } from './TVICLLogo';

export const ConceptBoardDrawer: React.FC = () => {
  const {
    isConceptDrawerOpen,
    setIsConceptDrawerOpen,
    savedHouse,
    currentHouse,
    savedMaterials,
    removeMaterialFromConcepts,
    smartSettings,
    followedProjects,
    openFollowSubscription,
    unsubscribeProject,
    activityLog,
    totalSavedCount,
    totalEstimatedInvestment,
    setIsConsultationModalOpen,
    resetJourney,
  } = useBuyerJourney();

  if (!isConceptDrawerOpen) return null;

  const houseToShow = savedHouse || currentHouse;

  const handleBookWithDossier = () => {
    setIsConceptDrawerOpen(false);
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsConceptDrawerOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="w-screen max-w-xl bg-[#13110d] border-l border-[#2e2920] shadow-2xl flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div className="p-6 border-b border-[#242018] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1f1b13] border border-[#3d3627] flex items-center justify-center text-[#e5c07b]">
                <Heart className="w-4 h-4 fill-[#e5c07b]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#f5f3ef]">
                  My Concept Board
                </h3>
                <p className="text-xs text-[#999080]">
                  {totalSavedCount} curated architectural components
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsConceptDrawerOpen(false)}
              className="w-8 h-8 rounded-lg bg-[#1a1813] border border-[#332e24] flex items-center justify-center text-[#b8b0a0] hover:text-[#f5f3ef] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body - TVICL Remembers You Experience */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* TVICL Remembers You Statement */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#1c1811] via-[#1a1712] to-[#16140f] border border-[#3b3425]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#e5c07b] mb-1">
                <TVICLLogo variant="mark-only" size="sm" />
                <span>TVICL BUYER DOSSIER</span>
              </div>
              <p className="text-sm font-serif italic text-[#f5f3ef]">
                "Everything you've explored. One journey."
              </p>
              <p className="text-xs text-[#a69d8d] mt-1">
                Your architectural choices, material selections, and followed sites accumulate here
                for your future blueprint.
              </p>
            </div>

            {/* 1. Saved House Archetype */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0] flex items-center gap-2">
                  <Home className="w-3.5 h-3.5 text-[#d4af37]" />
                  Architectural Archetype
                </span>
                <span className="text-xs text-[#e5c07b] font-medium">
                  {savedHouse ? 'Configured & Saved' : 'Currently Active'}
                </span>
              </div>

              <div className="rounded-xl border border-[#2d281e] bg-[#171510] p-4 flex gap-4 items-center">
                <img
                  src={houseToShow.image}
                  alt={houseToShow.tagline}
                  className="w-24 h-20 rounded-lg object-cover border border-[#383125] flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-serif font-bold text-[#f5f3ef] truncate">
                    {houseToShow.bedrooms} Bedroom {houseToShow.style} Villa
                  </h4>
                  <p className="text-xs text-[#a8a090] mt-0.5">
                    {houseToShow.areaSqm}m² · {houseToShow.bathrooms} Baths · {houseToShow.parkingSpaces} Cars
                  </p>
                  <p className="text-sm font-serif font-bold text-[#e5c07b] mt-1">
                    {houseToShow.priceFormatted}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Curated Material Package */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0] flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                  Material Palette ({savedMaterials.length})
                </span>
                <span className="text-xs text-[#8c8474]">
                  {savedMaterials.length === 0 ? 'No materials yet' : 'Custom Specs'}
                </span>
              </div>

              {savedMaterials.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-[#302b21] text-center text-xs text-[#7d7565]">
                  Browse Materials & Sourcing and tap "+ Add to Concepts" to assemble your palette.
                </div>
              ) : (
                <div className="space-y-2">
                  {savedMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      className="p-3 rounded-lg border border-[#2b261e] bg-[#171510] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={mat.image}
                          alt={mat.name}
                          className="w-10 h-10 rounded-md object-cover border border-[#3b3427]"
                        />
                        <div>
                          <p className="text-xs font-semibold text-[#f5f3ef]">{mat.name}</p>
                          <p className="text-[10px] text-[#8e8574]">
                            {mat.origin} · {mat.pricePerSqmFormatted}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeMaterialFromConcepts(mat.id)}
                        className="text-[#8c8474] hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Smart Home Configuration */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0] flex items-center gap-2 mb-3">
                <Cpu className="w-3.5 h-3.5 text-[#d4af37]" />
                Smart Home Architecture
              </span>
              <div className="p-4 rounded-xl border border-[#2d281e] bg-[#171510] grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#8c8474] block">Ambient Lighting</span>
                  <span className="font-medium text-[#f5f3ef] capitalize">
                    {smartSettings.lightingMode.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8c8474] block">Climate Baseline</span>
                  <span className="font-medium text-[#f5f3ef] font-mono">
                    {smartSettings.targetTemp}°C Silent Cooling
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8c8474] block">Security Guard</span>
                  <span className="font-medium text-cyan-400">
                    {smartSettings.securityArmed ? 'Armed Perimeter' : 'Standby'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8c8474] block">Acoustics</span>
                  <span className="font-medium text-[#e5c07b]">
                    {smartSettings.ambientSound ? 'Hi-Res Multi-Zone' : 'Muted'}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Followed Construction Projects & Notification Hub Channel Badges */}
            {followedProjects.length > 0 && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0] flex items-center gap-2 mb-3">
                  <Bell className="w-3.5 h-3.5 text-[#d4af37]" />
                  Followed Construction Sites & Subscriptions
                </span>
                <div className="space-y-2">
                  {followedProjects.map((proj) => {
                    const sub = proj.subscription;
                    const getChannelBadge = (ch?: string) => {
                      switch (ch) {
                        case 'whatsapp':
                          return { label: 'WhatsApp', color: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400' };
                        case 'instagram':
                          return { label: 'Instagram DM', color: 'bg-rose-950/80 border-rose-500/40 text-rose-300' };
                        case 'messenger':
                          return { label: 'Messenger', color: 'bg-blue-950/80 border-blue-500/40 text-blue-300' };
                        case 'linkedin':
                          return { label: 'LinkedIn', color: 'bg-sky-950/80 border-sky-500/40 text-sky-300' };
                        case 'both':
                          return { label: 'WhatsApp + Email', color: 'bg-amber-950/80 border-amber-500/40 text-amber-300' };
                        default:
                          return { label: 'Email', color: 'bg-slate-900 border-slate-700 text-slate-300' };
                      }
                    };
                    const badge = getChannelBadge(sub?.channel);

                    return (
                      <div
                        key={proj.id}
                        className="p-3 rounded-lg border border-[#2b261e] bg-[#171510] flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.image}
                            alt={proj.name}
                            className="w-10 h-10 rounded-md object-cover border border-[#3b3427]"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-semibold text-[#f5f3ef]">{proj.name}</p>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#8e8574] mt-0.5">{proj.headline}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openFollowSubscription(proj)}
                            className="text-xs text-[#e5c07b] hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => unsubscribeProject(proj.id)}
                            className="text-xs text-[#8c8474] hover:text-rose-400 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. Living Activity Timeline (Structured Behavioral Intelligence) */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0] block mb-3">
                Journey Activity Timeline
              </span>
              <div className="space-y-2.5 border-l-2 border-[#2b271f] pl-4 ml-2">
                {activityLog.slice(0, 5).map((log) => (
                  <div key={log.id} className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#d4af37] ring-4 ring-[#13110d]" />
                    <p className="text-xs font-medium text-[#f5f3ef]">{log.title}</p>
                    <p className="text-[10px] text-[#8c8474]">{log.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Drawer Bottom Action Bar */}
          <div className="p-6 border-t border-[#242018] bg-[#110f0c] space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#8c8474] block">Estimated Total Investment</span>
                <span className="text-xl font-serif font-bold text-[#e5c07b]">
                  <AnimatedPriceCounter value={totalEstimatedInvestment} />
                </span>
              </div>
              <button
                onClick={resetJourney}
                className="text-xs text-[#8c8474] hover:text-[#e6e2d8] underline cursor-pointer"
              >
                Reset Board
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBookWithDossier}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#c59b27]/20 cursor-pointer"
              >
                <span>Book Consultation with Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

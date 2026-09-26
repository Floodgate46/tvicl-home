import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  TrendingUp,
  Radio,
  Eye,
  Bookmark,
  Building,
  Bell,
  MessageCircle,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { LIVE_CONSTRUCTION_PROJECTS } from '../data/mockData';
import { ConstructionProject } from '../types';

export const ConstructionPulse: React.FC = () => {
  const {
    followedProjects,
    openFollowSubscription,
    isProjectFollowed,
    getProjectSubscription,
    setSelectedInspectionProject,
    markStageComplete,
  } = useBuyerJourney();

  const [activeProject, setActiveProject] = useState<ConstructionProject>(
    LIVE_CONSTRUCTION_PROJECTS[0]
  );
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Animate progress bar from 0 to 78%
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(78);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleFollowClick = (project: ConstructionProject, e: React.MouseEvent) => {
    e.stopPropagation();
    openFollowSubscription(project);
  };

  const handleOpenInspection = (project: ConstructionProject) => {
    markStageComplete('Explore');
    setSelectedInspectionProject(project);
  };

  const activeSub = getProjectSubscription(activeProject.id);

  return (
    <div
      id="construction-pulse"
      className="rounded-2xl border border-[#2b271f] bg-[#14120e] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
    >
      {/* Decorative ambient pulse aura */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Header with Live Pulsing Green Radar Indicator */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
              CONSTRUCTION PULSE
            </span>
            {/* Live Green Pulsing Indicator */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>LIVE SITE ACTIVITY</span>
            </div>
          </div>

          <h3 className="mt-1 text-2xl sm:text-3xl font-serif text-[#f5f3ef] leading-tight">
            From Dirt to Dream
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#a39b8c]">
            Live verified updates from our construction sites across Nigeria.
          </p>
        </div>
      </div>

      {/* Real-time Project Updates List */}
      <div className="space-y-3.5 my-auto">
        {LIVE_CONSTRUCTION_PROJECTS.map((proj, idx) => {
          const isFollowing = isProjectFollowed(proj.id);
          const isSelected = activeProject.id === proj.id;
          const sub = getProjectSubscription(proj.id);

          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => {
                setActiveProject(proj);
                handleOpenInspection(proj);
              }}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 group ${
                isSelected
                  ? 'border-[#c59b27] bg-[#1a1712] shadow-lg'
                  : 'border-[#2d281f] bg-[#171510] hover:border-[#4d4434]'
              }`}
            >
              {/* Site photo thumbnail */}
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-[#383226] relative">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                {isFollowing && (
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-sm" />
                )}
              </div>

              {/* Middle details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#f5f3ef] truncate group-hover:text-[#e5c07b] transition-colors">
                    {proj.name}
                  </h4>
                  <span className="text-[10px] text-[#787161] hidden sm:inline truncate">
                    {proj.location.split(',')[0]}
                  </span>
                  {isFollowing && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono hidden sm:inline">
                      {sub?.channel === 'whatsapp' ? 'WhatsApp' : sub?.channel === 'email' ? 'Email' : 'WhatsApp + Email'}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#b8b09f] mt-0.5 truncate">
                  {proj.headline}
                </p>

                {/* Animated Progress Bar for Riverside Gardens (Roofing reached 78%) */}
                {proj.id === 'proj-riverside' && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#26221a] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#c59b27] to-[#e5c07b] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${animatedProgress}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#e5c07b]">
                      {animatedProgress}%
                    </span>
                  </div>
                )}
              </div>

              {/* Right status icon & timestamp */}
              <div className="flex flex-col items-end flex-shrink-0 gap-1">
                {proj.statusType === 'check' && (
                  <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
                {proj.statusType === 'progress' && (
                  <div className="w-5 h-5 rounded-full bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                )}
                {proj.statusType === 'trowel' && (
                  <div className="w-5 h-5 rounded-full bg-[#2a2419] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                    <Building className="w-3 h-3" />
                  </div>
                )}

                <span className="text-[10px] text-[#807767] whitespace-nowrap">
                  {proj.timestamp}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Action Buttons: Open Follow Notification Subscription Panel */}
      <div className="mt-6 pt-5 border-t border-[#262118] flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
        <button
          onClick={(e) => handleFollowClick(activeProject, e)}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
            isProjectFollowed(activeProject.id)
              ? 'bg-[#c59b27]/20 border border-[#e5c07b] text-[#e5c07b]'
              : 'bg-[#1e1b15] border border-[#383226] text-[#e6e1d5] hover:border-[#c59b27]'
          }`}
        >
          <Bell className={`w-3.5 h-3.5 ${isProjectFollowed(activeProject.id) ? 'fill-[#e5c07b]' : ''}`} />
          <span>
            {isProjectFollowed(activeProject.id)
              ? `Subscribed to ${activeProject.name}`
              : `Follow This Project`}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => handleOpenInspection(activeProject)}
          className="w-full sm:w-auto text-xs text-[#a69e8e] hover:text-[#e5c07b] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>View all projects</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

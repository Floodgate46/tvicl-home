import React from 'react';
import { Check, Compass, Sparkles } from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { JourneyStage } from '../types';

const STAGES: { key: JourneyStage; label: string; desc: string; targetId?: string }[] = [
  { key: 'Discover', label: 'Discover', desc: 'Browse the vision and portfolio', targetId: 'discover' },
  { key: 'Explore', label: 'Explore', desc: 'Select intent & tour live sites', targetId: 'intent-router' },
  { key: 'Configure', label: 'Configure', desc: 'Customize bedrooms, style & price', targetId: 'dream-home' },
  { key: 'Save', label: 'Save', desc: 'Curate your concept board', targetId: 'dream-home' },
  { key: 'Engage', label: 'Engage', desc: 'Test smart controls & finishes', targetId: 'smart-home' },
  { key: 'Request', label: 'Request', desc: 'Take quiz or request custom package', targetId: 'home-quiz' },
  { key: 'Qualify', label: 'Qualify', desc: 'Review blueprint with lead architect', targetId: 'conversion-footer' },
];

export const BuyerJourneyTracker: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { completedStages, activeStage, setStageActive, markStageComplete } = useBuyerJourney();

  const handleStageClick = (stage: (typeof STAGES)[0]) => {
    setStageActive(stage.key);
    markStageComplete(stage.key);
    if (stage.targetId) {
      const el = document.getElementById(stage.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`w-full ${compact ? 'py-2' : 'py-4'}`}>
      {/* Tracker Bar */}
      <div className="relative flex items-center justify-between max-w-4xl mx-auto px-2 sm:px-4">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-[#26231c] z-0">
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#d4af37] transition-all duration-700 ease-out"
            style={{
              width: `${
                (STAGES.filter((s) => completedStages[s.key]).length / STAGES.length) * 100
              }%`,
            }}
          />
        </div>

        {/* Stage Nodes */}
        {STAGES.map((s, idx) => {
          const isCompleted = completedStages[s.key];
          const isActive = activeStage === s.key;

          return (
            <div
              key={s.key}
              onClick={() => handleStageClick(s)}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              {/* Dot */}
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-[#e5c07b] to-[#c59b27] text-[#131210] shadow-[0_0_12px_rgba(212,175,55,0.6)] scale-105'
                    : isActive
                    ? 'border-2 border-[#e5c07b] bg-[#1a1814] ring-4 ring-[#e5c07b]/20 scale-110'
                    : 'border border-[#3d382e] bg-[#141310] group-hover:border-[#736a57]'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3d382e] group-hover:bg-[#736a57]" />
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-[10px] sm:text-xs tracking-wider uppercase transition-colors duration-200 select-none ${
                  isCompleted || isActive
                    ? 'text-[#e5c07b] font-semibold'
                    : 'text-[#736b5c] group-hover:text-[#a89f8d]'
                }`}
              >
                {s.label}
              </span>

              {/* Tooltip on Hover */}
              <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 pointer-events-none z-30 whitespace-nowrap bg-[#1a1814] text-[#e6e2d8] border border-[#3d382e] text-[11px] px-2.5 py-1 rounded shadow-lg">
                {s.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

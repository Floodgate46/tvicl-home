import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Sun,
  Moon,
  Sparkles,
  Thermometer,
  ShieldCheck,
  ShieldAlert,
  Volume2,
  VolumeX,
  ArrowRight,
  Sliders,
  Check,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { SmartLightingMode } from '../types';

export const SmartHomeSimulator: React.FC = () => {
  const {
    smartSettings,
    updateSmartLighting,
    setTargetTemp,
    toggleSecurity,
    toggleAmbientSound,
    saveSmartSettingsToConcepts,
    markStageComplete,
  } = useBuyerJourney();

  const [savedLocally, setSavedLocally] = useState(false);

  const handleSaveSmart = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    saveSmartSettingsToConcepts(coords);
    setSavedLocally(true);
    setTimeout(() => setSavedLocally(false), 2000);
  };

  // Visual filters depending on lighting mode
  const getRoomVisualOverlay = () => {
    switch (smartSettings.lightingMode) {
      case 'warm-evening':
        return 'bg-gradient-to-t from-amber-950/60 via-amber-900/20 to-transparent mix-blend-color-burn';
      case 'night-cinema':
        return 'bg-gradient-to-t from-indigo-950/75 via-blue-950/40 to-transparent mix-blend-multiply';
      case 'daylight':
      default:
        return 'bg-white/10 mix-blend-soft-light';
    }
  };

  return (
    <div
      id="smart-home"
      className="rounded-2xl border border-[#2b271f] bg-[#14120e] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
    >
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
            Smart Home
          </span>
        </div>
        <h3 className="mt-1 text-2xl sm:text-3xl font-serif text-[#f5f3ef]">
          Configure a Smarter Home
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#a39b8c] max-w-md">
          Control lighting, climate, security and acoustic entertainment. See how your space
          responds in real-time.
        </p>
      </div>

      {/* Interactive Room Showcase with Living Visual Feedback */}
      <div className="relative my-6 rounded-xl overflow-hidden border border-[#332e24] bg-black h-64 sm:h-72">
        {/* Base room photography: Luxury living room */}
        <motion.img
          key={smartSettings.lightingMode}
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
          alt="Smart Home Living Suite"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />

        {/* Dynamic Room Lighting Filter Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-700 pointer-events-none ${getRoomVisualOverlay()}`}
        />

        {/* If warm evening: warm cove lighting highlight */}
        {smartSettings.lightingMode === 'warm-evening' && (
          <div className="absolute inset-0 bg-radial from-amber-500/35 via-transparent to-transparent pointer-events-none mix-blend-screen transition-opacity duration-700" />
        )}

        {/* If night cinema: subtle neon indigo ambient accents */}
        {smartSettings.lightingMode === 'night-cinema' && (
          <div className="absolute inset-0 bg-radial from-indigo-500/25 via-transparent to-black/60 pointer-events-none transition-opacity duration-700" />
        )}

        {/* If Security Armed: Active Perimeter Neon Lines on Glass */}
        {smartSettings.securityArmed && (
          <div className="absolute inset-0 border-4 border-cyan-400/40 pointer-events-none shadow-[inset_0_0_30px_rgba(34,211,238,0.25)] transition-all duration-500">
            <div className="absolute top-3 left-3 bg-cyan-950/80 border border-cyan-400/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-cyan-300 flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Perimeter Armed · Biometrics Active</span>
            </div>
          </div>
        )}

        {/* Climate indicator on room glass */}
        <div className="absolute bottom-3 left-3 bg-[#110f0c]/85 border border-[#3b3528] backdrop-blur-md px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
          <Thermometer className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-mono font-semibold text-[#f5f3ef]">{smartSettings.targetTemp}°C</span>
          <span className="text-[10px] text-[#8e8574]">
            {smartSettings.targetTemp <= 20 ? 'Cooling Active' : 'Eco Balanced'}
          </span>
        </div>

        {/* Sound system badge */}
        {smartSettings.ambientSound && (
          <div className="absolute top-3 right-3 bg-[#110f0c]/85 border border-[#3b3528] backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#e5c07b] flex items-center gap-1.5">
            <span className="flex items-center gap-0.5">
              <span className="w-0.5 h-2 bg-[#e5c07b] animate-pulse" />
              <span className="w-0.5 h-3 bg-[#e5c07b] animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-[#e5c07b] animate-pulse delay-150" />
            </span>
            <span>Acoustics On</span>
          </div>
        )}
      </div>

      {/* In-Screen Control Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {/* Lighting Selector */}
        <button
          onClick={() => {
            const nextMode: Record<SmartLightingMode, SmartLightingMode> = {
              'warm-evening': 'daylight',
              daylight: 'night-cinema',
              'night-cinema': 'warm-evening',
            };
            updateSmartLighting(nextMode[smartSettings.lightingMode]);
          }}
          className="p-2.5 rounded-xl border border-[#302b21] bg-[#191712] hover:border-[#c59b27] transition-all text-left cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#d4af37] mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-[9px] uppercase font-mono tracking-wider bg-[#262118] px-1 rounded text-[#a69e8e]">
              Cycle
            </span>
          </div>
          <span className="text-[10px] text-[#8c8371] block">Lighting</span>
          <span className="text-xs font-semibold text-[#f5f3ef] capitalize truncate block">
            {smartSettings.lightingMode.replace('-', ' ')}
          </span>
        </button>

        {/* Climate Stepper */}
        <div className="p-2.5 rounded-xl border border-[#302b21] bg-[#191712] text-left">
          <div className="flex items-center justify-between text-sky-400 mb-1">
            <Thermometer className="w-4 h-4" />
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTargetTemp(Math.max(18, smartSettings.targetTemp - 1))}
                className="w-4 h-4 rounded bg-[#262118] text-xs flex items-center justify-center text-[#e6e2d8] hover:text-[#d4af37] cursor-pointer"
              >
                -
              </button>
              <button
                onClick={() => setTargetTemp(Math.min(26, smartSettings.targetTemp + 1))}
                className="w-4 h-4 rounded bg-[#262118] text-xs flex items-center justify-center text-[#e6e2d8] hover:text-[#d4af37] cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <span className="text-[10px] text-[#8c8371] block">Climate</span>
          <span className="text-xs font-semibold text-[#f5f3ef] font-mono">
            {smartSettings.targetTemp}°C (Cool)
          </span>
        </div>

        {/* Security Toggle */}
        <button
          onClick={toggleSecurity}
          className={`p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
            smartSettings.securityArmed
              ? 'border-cyan-500/50 bg-cyan-950/20 text-[#f5f3ef]'
              : 'border-[#302b21] bg-[#191712] text-[#8c8371]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            {smartSettings.securityArmed ? (
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-[#787161]" />
            )}
            <span
              className={`text-[9px] font-mono px-1 rounded ${
                smartSettings.securityArmed
                  ? 'bg-cyan-900/60 text-cyan-300'
                  : 'bg-[#262118] text-[#8c8371]'
              }`}
            >
              {smartSettings.securityArmed ? 'ARMED' : 'OFF'}
            </span>
          </div>
          <span className="text-[10px] text-[#8c8371] block">Security</span>
          <span className="text-xs font-semibold text-[#f5f3ef] truncate block">
            {smartSettings.securityArmed ? 'Radar Guard' : 'Disarmed'}
          </span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleAmbientSound}
          className={`p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
            smartSettings.ambientSound
              ? 'border-[#c59b27]/60 bg-[#1f1b13] text-[#f5f3ef]'
              : 'border-[#302b21] bg-[#191712] text-[#8c8371]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            {smartSettings.ambientSound ? (
              <Volume2 className="w-4 h-4 text-[#e5c07b]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#787161]" />
            )}
            <span className="text-[9px] font-mono bg-[#262118] px-1 rounded text-[#a69e8e]">
              {smartSettings.ambientSound ? 'HI-RES' : 'MUTE'}
            </span>
          </div>
          <span className="text-[10px] text-[#8c8371] block">Sound</span>
          <span className="text-xs font-semibold text-[#f5f3ef] truncate block">
            {smartSettings.ambientSound ? 'Spatial Lounge' : 'Inactive'}
          </span>
        </button>
      </div>

      {/* Bottom CTA */}
      <div className="pt-4 border-t border-[#262118] flex items-center justify-between">
        <button
          onClick={handleSaveSmart}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#c59b27]/20 cursor-pointer"
        >
          {savedLocally ? <Check className="w-4 h-4" /> : <Sliders className="w-4 h-4" />}
          <span>{savedLocally ? 'Smart Preset Saved' : 'Configure my smart features'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <span className="text-xs text-[#a69e8e]">
          Automation v4.2 Ready
        </span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { TVICLLogo } from './TVICLLogo';

export const ConsultationModal: React.FC = () => {
  const {
    isConsultationModalOpen,
    setIsConsultationModalOpen,
    savedHouse,
    currentHouse,
    savedMaterials,
    followedProjects,
    totalEstimatedInvestment,
    markStageComplete,
  } = useBuyerJourney();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lagos (Banana Island / Ikoyi)');
  const [preferredMeeting, setPreferredMeeting] = useState<'ikoyi' | 'maitama' | 'virtual'>('ikoyi');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isConsultationModalOpen) return null;

  const house = savedHouse || currentHouse;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    markStageComplete('Qualify');
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsConsultationModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[#14120e] border border-[#332e24] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#28241d] flex items-center justify-between bg-[#110f0c]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1f1b13] border border-[#3d3627] flex items-center justify-center p-1">
              <TVICLLogo variant="mark-only" size="sm" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#f5f3ef]">
                Request Private Architectural Consultation
              </h3>
              <p className="text-xs text-[#8c8474]">
                The Valley Investment Company Limited · Blueprints & structural advisory
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-[#1a1813] border border-[#332e24] flex items-center justify-center text-[#b8b0a0] hover:text-[#f5f3ef] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Concept Dossier Summary Box */}
              <div className="p-4 rounded-xl bg-[#1a1711] border border-[#332e22]">
                <div className="flex items-center justify-between text-xs text-[#e5c07b] font-semibold mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Attached TVICL Dossier
                  </span>
                  <span className="font-mono text-xs">{house.priceFormatted}</span>
                </div>
                <div className="text-xs text-[#d1cabf] space-y-1">
                  <p className="font-medium text-[#f5f3ef]">
                    {house.bedrooms} Bedroom {house.style} Archetype ({house.areaSqm}m²)
                  </p>
                  <p className="text-[11px] text-[#8e8574]">
                    {savedMaterials.length} Curated Materials · {followedProjects.length} Followed Projects
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#b5af9f] uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Arc. Oladipo Adeleke"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#191712] border border-[#302b21] text-xs sm:text-sm text-[#f5f3ef] placeholder-[#665f52] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#b5af9f] uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#191712] border border-[#302b21] text-xs sm:text-sm text-[#f5f3ef] placeholder-[#665f52] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#b5af9f] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="oladipo@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#191712] border border-[#302b21] text-xs sm:text-sm text-[#f5f3ef] placeholder-[#665f52] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#b5af9f] uppercase tracking-wider mb-1.5">
                    Target Development City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#191712] border border-[#302b21] text-xs sm:text-sm text-[#f5f3ef] focus:border-[#d4af37] focus:outline-none transition-colors"
                  >
                    <option value="Lagos (Banana Island / Ikoyi)">Lagos (Banana Island / Ikoyi)</option>
                    <option value="Lagos (Lekki / Victoria Island)">Lagos (Lekki / Victoria Island)</option>
                    <option value="Abuja (Maitama / Guzape)">Abuja (Maitama / Guzape)</option>
                    <option value="Abuja (Jabi Lakefront)">Abuja (Jabi Lakefront)</option>
                    <option value="Port Harcourt (Old GRA)">Port Harcourt (Old GRA)</option>
                    <option value="Other Prime City">Other Prime City</option>
                  </select>
                </div>
              </div>

              {/* Consultation Meeting Type */}
              <div>
                <label className="block text-xs font-medium text-[#b5af9f] uppercase tracking-wider mb-2">
                  Preferred Meeting Experience
                </label>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPreferredMeeting('ikoyi')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      preferredMeeting === 'ikoyi'
                        ? 'border-[#e5c07b] bg-[#221d15] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#181611] text-[#8e8574]'
                    }`}
                  >
                    <p className="font-semibold">Ikoyi Design Studio</p>
                    <p className="text-[10px] text-[#736c5d] mt-0.5">Lagos Office</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredMeeting('maitama')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      preferredMeeting === 'maitama'
                        ? 'border-[#e5c07b] bg-[#221d15] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#181611] text-[#8e8574]'
                    }`}
                  >
                    <p className="font-semibold">Maitama VIP Suite</p>
                    <p className="text-[10px] text-[#736c5d] mt-0.5">Abuja Office</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredMeeting('virtual')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      preferredMeeting === 'virtual'
                        ? 'border-[#e5c07b] bg-[#221d15] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#181611] text-[#8e8574]'
                    }`}
                  >
                    <p className="font-semibold">Private Video Call</p>
                    <p className="text-[10px] text-[#736c5d] mt-0.5">Global / Diaspora</p>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-sm hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-[#c59b27]/25 cursor-pointer"
                >
                  <span>Submit Blueprint Briefing Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-[#787060] text-center mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Strict confidentiality guaranteed. Our Senior Partner responds within 2 hours.</span>
                </p>
              </div>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="text-center py-8 space-y-5">
              <div className="flex justify-center mb-1">
                <TVICLLogo variant="stacked" size="md" showSubtitle={true} />
              </div>

              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#f5f3ef]">
                  Consultation Request Received
                </h3>
                <p className="text-xs sm:text-sm text-[#b5af9f] max-w-md mx-auto mt-2">
                  Thank you, <span className="text-[#f5f3ef] font-semibold">{fullName || 'Sir/Madam'}</span>.
                  Your TVICL Concept Dossier has been transmitted to our Principal Architectural
                  Partner for {city}.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#191711] border border-[#2e2920] max-w-md mx-auto text-left text-xs space-y-1.5 text-[#cfc7b6]">
                <p><span className="text-[#8c8474]">Target Archetype:</span> {house.bedrooms}-Bed {house.style} Villa</p>
                <p><span className="text-[#8c8474]">Meeting Venue:</span> {preferredMeeting.toUpperCase()} Studio</p>
                <p><span className="text-[#8c8474]">Follow-up:</span> Immediate WhatsApp & Email dispatch</p>
              </div>

              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg bg-[#221d15] border border-[#3b3427] text-xs font-semibold text-[#e5c07b] hover:bg-[#2b251c] transition-all cursor-pointer"
              >
                Return to Exploration
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

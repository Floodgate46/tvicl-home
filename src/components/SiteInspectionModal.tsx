import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  UserCheck,
  Camera,
  Calendar,
  Bookmark,
  Building,
  Bell,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';

export const SiteInspectionModal: React.FC = () => {
  const {
    selectedInspectionProject,
    setSelectedInspectionProject,
    openFollowSubscription,
    isProjectFollowed,
    getProjectSubscription,
    setIsConsultationModalOpen,
  } = useBuyerJourney();

  if (!selectedInspectionProject) return null;

  const proj = selectedInspectionProject;
  const isFollowing = isProjectFollowed(proj.id);
  const sub = getProjectSubscription(proj.id);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    openFollowSubscription(proj);
  };

  const handleBookVisit = () => {
    setSelectedInspectionProject(null);
    setIsConsultationModalOpen(true);
  };

  const milestones = [
    { title: 'Sub-structure Piling & Raft', status: 'Completed & Certified', passed: true, date: '12 Aug 2026' },
    { title: 'Reinforced Concrete Superstructure', status: 'Completed & Cured', passed: true, date: '04 Sep 2026' },
    { title: 'Standing Seam Roof & Waterproofing', status: proj.id === 'proj-riverside' ? 'In Progress (78%)' : 'Completed', passed: proj.id !== 'proj-riverside', date: proj.dateFormatted },
    { title: 'MEP Structured Cabling & Solar Busway', status: proj.id === 'proj-lakeview' ? 'Load Tested & Passed' : 'Underway', passed: proj.id === 'proj-lakeview', date: '24 Sep 2026' },
    { title: 'Interior Marble & Joinery Commissioning', status: proj.id === 'proj-apo' ? 'Commenced Stage 1' : 'Scheduled', passed: false, date: 'Pending' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedInspectionProject(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-[#14120e] border border-[#332e24] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#28241d] flex items-center justify-between bg-[#110f0c]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#f5f3ef]">
                Live Site Inspection · {proj.name}
              </h3>
              <p className="text-xs text-[#8c8474] flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#d4af37]" />
                <span>{proj.location}</span>
                <span>·</span>
                <span>Verified {proj.timestamp}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedInspectionProject(null)}
            className="w-8 h-8 rounded-lg bg-[#1a1813] border border-[#332e24] flex items-center justify-center text-[#b8b0a0] hover:text-[#f5f3ef] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Site Hero Banner */}
          <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden border border-[#2e2a22]">
            <img
              src={proj.image}
              alt={proj.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14120e] via-black/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                  {proj.status}
                </span>
                <h4 className="text-lg font-serif font-bold text-[#f5f3ef] mt-1">
                  {proj.headline}
                </h4>
              </div>

              {isFollowing && (
                <div className="px-2.5 py-1 rounded-lg bg-[#110f0c]/90 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="capitalize">
                    Subscribed ({sub?.channel === 'both' ? 'WhatsApp + Email' : sub?.channel})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Site Personnel & Regulatory Compliance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-[#191712] border border-[#2e2920] text-xs">
              <span className="text-[10px] text-[#8c8474] block mb-1">COREN Registered Site Engineer</span>
              <p className="font-semibold text-[#f5f3ef] flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                {proj.siteEngineer}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#191712] border border-[#2e2920] text-xs">
              <span className="text-[10px] text-[#8c8474] block mb-1">Architectural Directorate</span>
              <p className="font-semibold text-[#f5f3ef] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#d4af37]" />
                {proj.architect}
              </p>
            </div>
          </div>

          {/* Engineer Field Report */}
          <div className="p-4 rounded-xl bg-[#1a1712] border border-[#332e24]">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0] mb-1.5">
              Latest Engineer Field Note
            </h5>
            <p className="text-xs text-[#cfc7b6] leading-relaxed">
              "{proj.recentMilestone}"
            </p>
          </div>

          {/* Construction Milestones */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0] mb-3">
              Quality Assurance Milestones
            </h5>
            <div className="space-y-2">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-[#2b271f] bg-[#16140f] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        m.passed ? 'text-emerald-400' : 'text-[#5e584b]'
                      }`}
                    />
                    <span className="font-medium text-[#f5f3ef]">{m.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#a69e8e] block">{m.status}</span>
                    <span className="text-[10px] text-[#6b6455]">{m.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#262118] bg-[#110f0c] flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <button
            onClick={handleFollow}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              isFollowing
                ? 'bg-[#c59b27]/25 border border-[#e5c07b] text-[#e5c07b]'
                : 'bg-[#1b1913] border border-[#383226] text-[#e6e2d8] hover:border-[#c59b27]'
            }`}
          >
            <Bell className={`w-3.5 h-3.5 ${isFollowing ? 'fill-[#e5c07b]' : ''}`} />
            <span>{isFollowing ? 'Manage Notification Subscription' : 'Follow This Project'}</span>
          </button>

          <button
            onClick={handleBookVisit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-xs hover:brightness-110 active:scale-98 transition-all shadow-md cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule On-Site Inspection</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

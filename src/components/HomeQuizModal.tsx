import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Building, MapPin, DollarSign, Calendar } from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';

interface QuizStep {
  id: number;
  question: string;
  subtitle: string;
  icon: React.ElementType;
  options: { label: string; sub?: string }[];
}

const QUIZ_STEPS: QuizStep[] = [
  {
    id: 1,
    question: "What's your approximate investment budget?",
    subtitle: 'This helps us calibrate square meter footprint and structural specifications.',
    icon: DollarSign,
    options: [
      { label: '₦40M - ₦60M', sub: '3-Bedroom Refined Modern Archetypes' },
      { label: '₦60M - ₦100M', sub: '4 & 5-Bedroom Executive Luxury Villas' },
      { label: '₦100M - ₦200M', sub: '6+ Bedroom Trophy Compounds & Penthouses' },
      { label: 'Above ₦200M', sub: 'Custom Multi-Dwelling Palatial Estates' },
    ],
  },
  {
    id: 2,
    question: 'Where would you like to build?',
    subtitle: 'Location influences soil mechanics, zoning laws, and architectural daylight angles.',
    icon: MapPin,
    options: [
      { label: 'Lagos (Banana Island, Ikoyi & VI)', sub: 'High-density luxury coastal waterfront' },
      { label: 'Lagos (Lekki Phase 1, 2 & Epe)', sub: 'Modern masterplanned green communities' },
      { label: 'Abuja (Maitama, Guzape & Asokoro)', sub: 'Hillside topography & sprawling compounds' },
      { label: 'Port Harcourt / Other Prime Metros', sub: 'Executive garden estates' },
    ],
  },
  {
    id: 3,
    question: 'Which aesthetic feels most like you?',
    subtitle: 'Every TVICL property is designed to echo your interior lifestyle and ambition.',
    icon: Building,
    options: [
      { label: 'Sculptural Modernist', sub: 'Cantilevered slabs, double-volume glass, dark accents' },
      { label: 'Contemporary Tropical', sub: 'Internal water features, timber screens, open lanais' },
      { label: 'Timeless Classical', sub: 'Fluted stone, grand porticos, symmetry & balance' },
      { label: 'Minimalist Pavilion', sub: 'Pure geometric lines, concrete, seamless microcement' },
    ],
  },
  {
    id: 4,
    question: 'What is your groundbreaking timeline?',
    subtitle: 'We synchronize structural engineering reviews and regulatory filings to your schedule.',
    icon: Calendar,
    options: [
      { label: 'Immediate (Next 30–60 days)', sub: 'Ready for site inspection & blueprint finalization' },
      { label: 'Within 3 to 6 months', sub: 'Finalizing land acquisition & approvals' },
      { label: 'Within 6 to 12 months', sub: 'Curating concept board & financial schedule' },
      { label: 'Exploring for the future', sub: 'Gaining market insight and design inspiration' },
    ],
  },
];

export const HomeQuizModal: React.FC = () => {
  const {
    isQuizModalOpen,
    setIsQuizModalOpen,
    setQuizResult,
    setIsConsultationModalOpen,
    markStageComplete,
  } = useBuyerJourney();

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  if (!isQuizModalOpen) return null;

  const currentStep = QUIZ_STEPS[currentStepIdx];

  const handleSelectOption = (optionLabel: string) => {
    const updatedAnswers = { ...answers, [currentStepIdx]: optionLabel };
    setAnswers(updatedAnswers);

    if (currentStepIdx < QUIZ_STEPS.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    } else {
      // Finished all 4 questions!
      const budget = updatedAnswers[0] || '₦60M - ₦100M';
      const location = updatedAnswers[1] || 'Lagos (Ikoyi)';
      const style = updatedAnswers[2] || 'Sculptural Modernist';
      const timeline = updatedAnswers[3] || 'Within 3 to 6 months';

      const result = {
        budget,
        location,
        style,
        timeline,
        archetypeTitle: `5-Bedroom ${style} Estate`,
        estimatedCost: budget.includes('Above') ? '₦220,000,000' : '₦85,000,000',
      };

      setQuizResult(result);
      markStageComplete('Qualify');
      setShowResult(true);
    }
  };

  const handleClose = () => {
    setIsQuizModalOpen(false);
    setShowResult(false);
    setCurrentStepIdx(0);
  };

  const handleConsult = () => {
    setIsQuizModalOpen(false);
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-xl bg-[#14120e] border border-[#332e24] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#1a1813] border border-[#302c23] flex items-center justify-center text-[#9c9484] hover:text-[#f5f3ef] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!showResult ? (
          <div>
            {/* Step Progress */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#242018]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#241f17] border border-[#d4af37]/40 text-[#e5c07b] text-xs font-mono flex items-center justify-center font-bold">
                  {currentStepIdx + 1}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#8f8776] font-medium">
                  Step {currentStepIdx + 1} of {QUIZ_STEPS.length}
                </span>
              </div>

              {currentStepIdx > 0 && (
                <button
                  onClick={() => setCurrentStepIdx((prev) => prev - 1)}
                  className="text-xs text-[#a69e8e] hover:text-[#f5f3ef] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              )}
            </div>

            {/* Conversational Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#f5f3ef]">
                    {currentStep.question}
                  </h3>
                  <p className="mt-1 text-xs text-[#a39b8c]">
                    {currentStep.subtitle}
                  </p>
                </div>

                {/* Staggered Options */}
                <div className="space-y-2.5">
                  {currentStep.options.map((opt, i) => (
                    <motion.button
                      key={opt.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      onClick={() => handleSelectOption(opt.label)}
                      className="w-full text-left p-3.5 sm:p-4 rounded-xl border border-[#2b271f] bg-[#181611] hover:border-[#c59b27] hover:bg-[#1f1b14] transition-all duration-200 flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-[#f5f3ef] group-hover:text-[#e5c07b] transition-colors">
                          {opt.label}
                        </p>
                        {opt.sub && (
                          <p className="text-[11px] text-[#8e8574] mt-0.5">
                            {opt.sub}
                          </p>
                        )}
                      </div>
                      <div className="w-6 h-6 rounded-full border border-[#3b3427] flex items-center justify-center text-[#7d7564] group-hover:bg-[#d4af37] group-hover:text-[#131210] group-hover:border-[#d4af37] transition-all">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* RESULT SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 pt-2"
          >
            <div className="w-14 h-14 rounded-full bg-[#1e1a12] border border-[#d4af37] text-[#e5c07b] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              <Sparkles className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
                TAILORED ARCHITECTURAL MATCH
              </span>
              <h3 className="mt-1 text-2xl sm:text-3xl font-serif text-[#f5f3ef]">
                5-Bedroom {answers[2] || 'Contemporary'} Villa
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#b5af9f] max-w-md mx-auto">
                Calibrated for your {answers[0]} investment in {answers[1]}.
                Breakground scheduled {answers[3]}.
              </p>
            </div>

            {/* Spec breakdown */}
            <div className="p-4 rounded-xl bg-[#191712] border border-[#332e24] text-left grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-[#8c8474] block">Recommended Archetype</span>
                <span className="font-semibold text-[#f5f3ef]">5 Beds · 6 Baths · Infinity Pool</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8c8474] block">Target Footprint</span>
                <span className="font-semibold text-[#f5f3ef]">620 m² Built Area</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8c8474] block">Site Location</span>
                <span className="font-semibold text-[#e5c07b]">{answers[1]}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8c8474] block">Investment Baseline</span>
                <span className="font-semibold text-[#e5c07b] font-mono">{answers[0]}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleClose}
                className="w-full sm:w-1/2 py-3 px-4 rounded-lg border border-[#3b3528] bg-[#1a1813] text-[#e6e2d8] text-xs font-medium hover:border-[#c59b27] transition-all cursor-pointer"
              >
                Saved to Concept Board
              </button>

              <button
                onClick={handleConsult}
                className="w-full sm:w-1/2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] text-xs font-semibold hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#c59b27]/25 cursor-pointer"
              >
                Schedule Architect Review
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

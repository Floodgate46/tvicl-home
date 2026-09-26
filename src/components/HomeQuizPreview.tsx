import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';

const BUDGET_OPTIONS = [
  '₦40M - ₦60M',
  '₦60M - ₦100M',
  '₦100M - ₦200M',
  'Above ₦200M',
];

export const HomeQuizPreview: React.FC = () => {
  const { setIsQuizModalOpen, quizResult, markStageComplete } = useBuyerJourney();

  const handleOpenQuiz = () => {
    markStageComplete('Request');
    setIsQuizModalOpen(true);
  };

  return (
    <div
      id="home-quiz"
      className="rounded-2xl border border-[#2b271f] bg-[#14120e] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
    >
      {/* Decorative ambient aura */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-[#c59b27]/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto">
        {/* Left Side: Copy & CTA */}
        <div className="md:col-span-7 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#1d1a14] border border-[#3b3528] flex items-center justify-center text-[#e5c07b]">
            <HelpCircle className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#f5f3ef] leading-tight">
              Not sure what fits you?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#a39b8c] leading-relaxed">
              Take our 60-second Home Quiz to get personalised recommendations based on your
              budget, lifestyle, location and timeline.
            </p>
          </div>

          {quizResult ? (
            <div className="p-3 rounded-lg bg-[#1f1b13] border border-[#c59b27]/40 text-xs">
              <span className="text-[#e5c07b] font-medium flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Archetype Recommended: {quizResult.archetypeTitle}
              </span>
              <p className="text-[11px] text-[#b8b09f]">
                {quizResult.budget} · {quizResult.location}
              </p>
            </div>
          ) : null}

          <div className="pt-2">
            <button
              onClick={handleOpenQuiz}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#c59b27]/20 cursor-pointer"
            >
              <span>{quizResult ? 'Retake the Home Quiz' : 'Take the Home Quiz'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Phone Mockup matching screenshot exactly */}
        <div className="md:col-span-5 flex justify-center">
          <div
            onClick={handleOpenQuiz}
            className="w-56 sm:w-60 rounded-[28px] p-3 bg-[#1e1b15] border-2 border-[#3d372c] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer group"
          >
            {/* Phone Screen */}
            <div className="rounded-[20px] bg-[#14120e] p-4 border border-[#2b271f] flex flex-col justify-between h-72">
              {/* Phone speaker notch */}
              <div className="w-16 h-1 rounded-full bg-[#2b271f] mx-auto mb-3" />

              <div>
                <span className="text-[10px] text-[#d4af37] font-mono uppercase tracking-wider block text-center mb-1">
                  Step 1 of 4
                </span>
                <h4 className="text-xs sm:text-sm font-serif font-semibold text-[#f5f3ef] text-center mb-3">
                  What's your budget?
                </h4>

                {/* 4 Interactive Budget Pills */}
                <div className="space-y-1.5">
                  {BUDGET_OPTIONS.map((opt, idx) => (
                    <div
                      key={opt}
                      className={`py-1.5 px-3 rounded-lg text-center text-xs font-medium transition-all ${
                        idx === 1
                          ? 'bg-[#c59b27]/25 border border-[#e5c07b] text-[#f5f3ef]'
                          : 'bg-[#1b1913] border border-[#2e2920] text-[#cfc7b6] group-hover:border-[#4d4535]'
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-[10px] text-[#8e8574] group-hover:text-[#e5c07b] transition-colors inline-flex items-center gap-1">
                  <span>Tap to continue quiz</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import { TVICLLogo } from './TVICLLogo';

export const FlyingConceptParticle: React.FC = () => {
  const { flyingParticles, clearFlyingParticle } = useBuyerJourney();

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 overflow-hidden">
      <AnimatePresence>
        {flyingParticles.map((particle) => {
          // Find target position (header badge)
          const targetEl = document.getElementById('my-concepts-badge');
          const targetRect = targetEl?.getBoundingClientRect();
          const endX = targetRect ? targetRect.left + targetRect.width / 2 : window.innerWidth - 150;
          const endY = targetRect ? targetRect.top + targetRect.height / 2 : 36;

          return (
            <motion.div
              key={particle.id}
              initial={{
                x: particle.startX - 30,
                y: particle.startY - 30,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: [particle.startX - 30, (particle.startX + endX) / 2 - 40, endX - 16],
                y: [particle.startY - 30, Math.min(particle.startY, endY) - 60, endY - 16],
                scale: [1, 1.25, 0.35],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1], // luxury smooth curve
              }}
              onAnimationComplete={() => clearFlyingParticle(particle.id)}
              className="absolute w-14 h-14 rounded-full overflow-hidden border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.7)] bg-[#1a1814] flex items-center justify-center pointer-events-none"
            >
              {particle.imageUrl ? (
                <img
                  src={particle.imageUrl}
                  alt={particle.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#181612] flex items-center justify-center p-2">
                  <TVICLLogo variant="mark-only" size="sm" />
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

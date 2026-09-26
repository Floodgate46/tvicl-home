import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Home,
  Heart,
  Clock,
  Layers,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { CLIENT_REVIEWS, PLATFORM_METRICS } from '../data/mockData';

export const StatsAndTestimonials: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % CLIENT_REVIEWS.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length);
  };

  return (
    <section className="py-16 sm:py-20 border-t border-[#26221a] bg-[#0c0b09]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Metric Counters Strip matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-16 border-b border-[#242019]">
          {PLATFORM_METRICS.map((metric, idx) => {
            const icons = [Home, Heart, Clock, Layers, MapPin];
            const Icon = icons[idx] || Home;

            return (
              <div key={metric.label} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#171510] border border-[#2e281f] flex items-center justify-center text-[#e5c07b] flex-shrink-0 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#f5f3ef] tracking-tight block">
                    {metric.value}
                  </span>
                  <span className="text-xs text-[#9c9484] block font-medium">
                    {metric.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Header */}
        <div className="mt-16 flex items-end justify-between mb-10">
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
              REAL PEOPLE. REAL HOMES.
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-serif text-[#f5f3ef]">
              What Our Clients Say
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#383226] bg-[#161410] text-[#c7c0b0] flex items-center justify-center hover:border-[#e5c07b] hover:text-[#e5c07b] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[#383226] bg-[#161410] text-[#c7c0b0] flex items-center justify-center hover:border-[#e5c07b] hover:text-[#e5c07b] transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Testimonials Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-2xl border border-[#2b271f] bg-[#14120e] p-5 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#c59b27]/60 transition-all"
            >
              <div>
                {/* Photo of client home */}
                <div className="h-36 sm:h-40 rounded-xl overflow-hidden border border-[#2f2a20] mb-5 relative">
                  <img
                    src={
                      idx === 0
                        ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80'
                        : idx === 1
                        ? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=700&q=80'
                        : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80'
                    }
                    alt={review.homeModel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14120e] via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 text-[10px] px-2 py-0.5 rounded-full bg-[#110f0c]/85 border border-[#3b3528] text-[#e5c07b]">
                    {review.homeModel}
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-xs sm:text-sm text-[#d4cdbf] font-light leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Byline */}
              <div className="mt-6 pt-4 border-t border-[#242018] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#f5f3ef]">
                    — {review.clientName}
                  </h4>
                  <p className="text-[11px] text-[#8c8474]">
                    {review.location}
                  </p>
                </div>

                <span className="text-[10px] font-mono text-[#635c4f]">
                  {review.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

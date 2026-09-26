/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BuyerJourneyProvider } from './context/BuyerJourneyContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IntentRouter } from './components/IntentRouter';
import { EcosystemOverview } from './components/EcosystemOverview';
import { DreamHomeStudio } from './components/DreamHomeStudio';
import { ConstructionPulse } from './components/ConstructionPulse';
import { MaterialsSourcing } from './components/MaterialsSourcing';
import { SmartHomeSimulator } from './components/SmartHomeSimulator';
import { SurfaceStories } from './components/SurfaceStories';
import { HomeQuizPreview } from './components/HomeQuizPreview';
import { StatsAndTestimonials } from './components/StatsAndTestimonials';
import { DynamicConversionFooter } from './components/DynamicConversionFooter';
import { ConceptBoardDrawer } from './components/ConceptBoardDrawer';
import { HomeQuizModal } from './components/HomeQuizModal';
import { ThreeDModelModal } from './components/ThreeDModelModal';
import { SiteInspectionModal } from './components/SiteInspectionModal';
import { ConsultationModal } from './components/ConsultationModal';
import { SearchModal } from './components/SearchModal';
import { FollowProjectPanel } from './components/FollowProjectPanel';
import { FlyingConceptParticle } from './components/FlyingConceptParticle';

export default function App() {
  return (
    <BuyerJourneyProvider>
      <div className="min-h-screen bg-[#0e0d0b] text-[#f5f3ef] font-sans selection:bg-[#c59b27]/30 selection:text-[#f8d77a] relative">
        {/* Flying Microinteraction Particles */}
        <FlyingConceptParticle />

        {/* Persistent Luxury Navigation */}
        <Header />

        {/* 1. Hero Section ("Make the hero house feel alive") */}
        <HeroSection />

        {/* 2. Intent Router ("Turn the Intent Router into the first interactive moment") */}
        <IntentRouter />

        {/* 3. The TVICL Ecosystem Overview with Buyer-Journey Tracker */}
        <EcosystemOverview />

        {/* Interactive Feature Grids matching the screenshot layout */}
        <div className="py-12 sm:py-16 space-y-12 sm:space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Split Row 1: Dream Home Studio & Construction Pulse */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col">
              <DreamHomeStudio />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <ConstructionPulse />
            </div>
          </div>

          {/* Split Row 2: Materials & Sourcing & Smart Home */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 flex flex-col">
              <MaterialsSourcing />
            </div>
            <div className="lg:col-span-6 flex flex-col">
              <SmartHomeSimulator />
            </div>
          </div>

          {/* Split Row 3: Surface Stories & Home Quiz Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 flex flex-col">
              <SurfaceStories />
            </div>
            <div className="lg:col-span-6 flex flex-col">
              <HomeQuizPreview />
            </div>
          </div>

        </div>

        {/* Metrics Counter & Client Testimonials */}
        <StatsAndTestimonials />

        {/* 12. Dynamic Contextual Conversion Footer */}
        <DynamicConversionFooter />

        {/* Modals & Concept Board Drawer */}
        <ConceptBoardDrawer />
        <HomeQuizModal />
        <ThreeDModelModal />
        <SiteInspectionModal />
        <ConsultationModal />
        <SearchModal />
        {/* TVICL Notification Subscription Hub */}
        <FollowProjectPanel />
      </div>
    </BuyerJourneyProvider>
  );
}

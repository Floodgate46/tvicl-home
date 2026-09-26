import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  HouseConfig,
  MaterialItem,
  ConstructionProject,
  SmartHomeSettings,
  FinishPersonality,
  JourneyStage,
  BedroomCount,
  ArchitecturalStyle,
  ProjectSubscription,
} from '../types';
import {
  HOUSE_CONFIGURATIONS,
  LUXURY_MATERIALS,
  LIVE_CONSTRUCTION_PROJECTS,
  FINISH_STORIES,
} from '../data/mockData';

interface FlyingParticle {
  id: string;
  startX: number;
  startY: number;
  imageUrl?: string;
  title: string;
}

interface ActivityLogItem {
  id: string;
  timestamp: string;
  title: string;
  subtitle: string;
  type: 'house' | 'material' | 'smart' | 'project' | 'quiz' | 'finish';
}

interface DynamicConversionInfo {
  headline: string;
  subtitle: string;
  ctaText: string;
  accentBadge: string;
  category: 'house' | 'project' | 'material' | 'quiz' | 'default';
}

interface BuyerJourneyContextType {
  // Journey tracking
  completedStages: Record<JourneyStage, boolean>;
  activeStage: JourneyStage;
  setStageActive: (stage: JourneyStage) => void;
  markStageComplete: (stage: JourneyStage) => void;

  // Active Dream Home selection
  currentBedrooms: BedroomCount;
  setBedrooms: (count: BedroomCount) => void;
  currentStyle: ArchitecturalStyle;
  setStyle: (style: ArchitecturalStyle) => void;
  currentHouse: HouseConfig;
  savedHouse: HouseConfig | null;
  saveCurrentHouse: (sourceCoords?: { x: number; y: number }) => void;

  // Saved Materials
  savedMaterials: MaterialItem[];
  addMaterialToConcepts: (material: MaterialItem, sourceCoords?: { x: number; y: number }) => void;
  removeMaterialFromConcepts: (id: string) => void;
  isMaterialSaved: (id: string) => boolean;

  // Smart Home Settings
  smartSettings: SmartHomeSettings;
  updateSmartLighting: (mode: SmartHomeSettings['lightingMode']) => void;
  setTargetTemp: (temp: number) => void;
  toggleSecurity: () => void;
  toggleAmbientSound: () => void;
  saveSmartSettingsToConcepts: (sourceCoords?: { x: number; y: number }) => void;

  // Followed Construction Projects & Notification Subscriptions
  followedProjects: ConstructionProject[];
  projectToFollow: ConstructionProject | null;
  setProjectToFollow: (project: ConstructionProject | null) => void;
  openFollowSubscription: (project: ConstructionProject) => void;
  saveProjectSubscription: (project: ConstructionProject, subscription: ProjectSubscription, sourceCoords?: { x: number; y: number }) => void;
  unsubscribeProject: (projectId: string) => void;
  isProjectFollowed: (id: string) => boolean;
  getProjectSubscription: (projectId: string) => ProjectSubscription | undefined;

  // Surface Stories
  activeFinishStory: FinishPersonality;
  setActiveFinishStory: (story: FinishPersonality) => void;
  saveFinishStoryToConcepts: (story: FinishPersonality, sourceCoords?: { x: number; y: number }) => void;

  // Quiz State
  quizResult: {
    budget: string;
    location: string;
    style: string;
    timeline: string;
    archetypeTitle: string;
    estimatedCost: string;
  } | null;
  setQuizResult: (res: any) => void;

  // Activity Log
  activityLog: ActivityLogItem[];

  // Concept Board metrics
  totalSavedCount: number;
  totalEstimatedInvestment: number;
  isPulseHeaderBadge: boolean;

  // Modals & Drawers
  isConceptDrawerOpen: boolean;
  setIsConceptDrawerOpen: (open: boolean) => void;
  isQuizModalOpen: boolean;
  setIsQuizModalOpen: (open: boolean) => void;
  is3DModalOpen: boolean;
  setIs3DModalOpen: (open: boolean) => void;
  isConsultationModalOpen: boolean;
  setIsConsultationModalOpen: (open: boolean) => void;
  selectedInspectionProject: ConstructionProject | null;
  setSelectedInspectionProject: (proj: ConstructionProject | null) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // Flying Particles Microinteraction
  flyingParticles: FlyingParticle[];
  triggerFlyingAnimation: (coords: { x: number; y: number }, title: string, imageUrl?: string) => void;
  clearFlyingParticle: (id: string) => void;

  // Dynamic Conversion Footer Info
  dynamicConversion: DynamicConversionInfo;

  // Reset or clear
  resetJourney: () => void;
}

const BuyerJourneyContext = createContext<BuyerJourneyContextType | undefined>(undefined);

export const BuyerJourneyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Stage management
  const [completedStages, setCompletedStages] = useState<Record<JourneyStage, boolean>>({
    Discover: true,
    Explore: false,
    Configure: false,
    Save: false,
    Engage: false,
    Request: false,
    Qualify: false,
  });

  const [activeStage, setActiveStage] = useState<JourneyStage>('Discover');

  // House configuration
  const [currentBedrooms, setCurrentBedrooms] = useState<BedroomCount>(5);
  const [currentStyle, setCurrentStyle] = useState<ArchitecturalStyle>('Modern');
  const [savedHouse, setSavedHouse] = useState<HouseConfig | null>(null);

  // Materials
  const [savedMaterials, setSavedMaterials] = useState<MaterialItem[]>([]);

  // Smart Home
  const [smartSettings, setSmartSettings] = useState<SmartHomeSettings>({
    lightingMode: 'warm-evening',
    targetTemp: 21,
    securityArmed: true,
    ambientSound: true,
    activeZone: 'Great Room & Lanai',
  });

  // Followed projects & notification subscription panel state
  const [followedProjects, setFollowedProjects] = useState<ConstructionProject[]>([]);
  const [projectToFollow, setProjectToFollow] = useState<ConstructionProject | null>(null);

  // Surface stories
  const [activeFinishStory, setActiveFinishStory] = useState<FinishPersonality>(FINISH_STORIES[0]);

  // Quiz
  const [quizResult, setQuizResult] = useState<{
    budget: string;
    location: string;
    style: string;
    timeline: string;
    archetypeTitle: string;
    estimatedCost: string;
  } | null>(null);

  // Activity Log
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>([
    {
      id: 'init-1',
      timestamp: 'Just now',
      title: 'Discovered TVICL Platform',
      subtitle: 'Explored luxury residential portfolio and smart systems',
      type: 'house',
    },
  ]);

  // Flying particles & Header pulse
  const [flyingParticles, setFlyingParticles] = useState<FlyingParticle[]>([]);
  const [isPulseHeaderBadge, setIsPulseHeaderBadge] = useState(false);

  // Modals
  const [isConceptDrawerOpen, setIsConceptDrawerOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedInspectionProject, setSelectedInspectionProject] = useState<ConstructionProject | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Calculate current house from selection
  const houseKey = `${currentBedrooms}-${currentStyle}`;
  const currentHouse = HOUSE_CONFIGURATIONS[houseKey] || HOUSE_CONFIGURATIONS['5-Modern'];

  const markStageComplete = (stage: JourneyStage) => {
    setCompletedStages((prev) => ({ ...prev, [stage]: true }));
    setActiveStage(stage);
  };

  const setStageActive = (stage: JourneyStage) => {
    setActiveStage(stage);
  };

  // Helper to trigger flying particle microinteraction
  const triggerFlyingAnimation = (coords: { x: number; y: number }, title: string, imageUrl?: string) => {
    const id = `particle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setFlyingParticles((prev) => [...prev, { id, startX: coords.x, startY: coords.y, title, imageUrl }]);

    // Trigger pulse on the header badge
    setTimeout(() => {
      setIsPulseHeaderBadge(true);
      setTimeout(() => setIsPulseHeaderBadge(false), 900);
    }, 700);
  };

  const clearFlyingParticle = (id: string) => {
    setFlyingParticles((prev) => prev.filter((p) => p.id !== id));
  };

  // Save current house
  const saveCurrentHouse = (sourceCoords?: { x: number; y: number }) => {
    setSavedHouse(currentHouse);
    markStageComplete('Save');

    // Add activity log
    const logItem: ActivityLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'A moment ago',
      title: `${currentHouse.bedrooms} Bedroom ${currentHouse.style} Villa Saved`,
      subtitle: `${currentHouse.priceFormatted} · ${currentHouse.areaSqm}m² · ${currentHouse.features[0]}`,
      type: 'house',
    };
    setActivityLog((prev) => [logItem, ...prev]);

    if (sourceCoords) {
      triggerFlyingAnimation(sourceCoords, `${currentHouse.bedrooms}-Bed ${currentHouse.style}`, currentHouse.image);
    }
  };

  // Material actions
  const addMaterialToConcepts = (material: MaterialItem, sourceCoords?: { x: number; y: number }) => {
    if (!savedMaterials.some((m) => m.id === material.id)) {
      setSavedMaterials((prev) => [...prev, material]);
      markStageComplete('Save');

      const logItem: ActivityLogItem = {
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        title: `${material.name} Added to Palette`,
        subtitle: `${material.finishType} · ${material.rooms.join(', ')}`,
        type: 'material',
      };
      setActivityLog((prev) => [logItem, ...prev]);

      if (sourceCoords) {
        triggerFlyingAnimation(sourceCoords, material.name, material.image);
      }
    }
  };

  const removeMaterialFromConcepts = (id: string) => {
    setSavedMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const isMaterialSaved = (id: string) => savedMaterials.some((m) => m.id === id);

  // Smart home actions
  const updateSmartLighting = (mode: SmartHomeSettings['lightingMode']) => {
    setSmartSettings((prev) => ({ ...prev, lightingMode: mode }));
    markStageComplete('Engage');
  };

  const setTargetTemp = (temp: number) => {
    setSmartSettings((prev) => ({ ...prev, targetTemp: temp }));
    markStageComplete('Engage');
  };

  const toggleSecurity = () => {
    setSmartSettings((prev) => ({ ...prev, securityArmed: !prev.securityArmed }));
    markStageComplete('Engage');
  };

  const toggleAmbientSound = () => {
    setSmartSettings((prev) => ({ ...prev, ambientSound: !prev.ambientSound }));
    markStageComplete('Engage');
  };

  const saveSmartSettingsToConcepts = (sourceCoords?: { x: number; y: number }) => {
    markStageComplete('Save');
    const logItem: ActivityLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      title: 'Smart Automation Preset Saved',
      subtitle: `${smartSettings.lightingMode} · ${smartSettings.targetTemp}°C · ${smartSettings.securityArmed ? 'Perimeter Armed' : 'Standby'}`,
      type: 'smart',
    };
    setActivityLog((prev) => [logItem, ...prev]);

    if (sourceCoords) {
      triggerFlyingAnimation(sourceCoords, 'Smart Automation Preset');
    }
  };

  // Followed projects & Notification Hub actions
  const openFollowSubscription = (project: ConstructionProject) => {
    setProjectToFollow(project);
  };

  const saveProjectSubscription = (
    project: ConstructionProject,
    subscription: ProjectSubscription,
    sourceCoords?: { x: number; y: number }
  ) => {
    const updatedProject: ConstructionProject = {
      ...project,
      isFollowing: true,
      subscription,
    };

    setFollowedProjects((prev) => {
      const exists = prev.some((p) => p.id === project.id);
      if (exists) {
        return prev.map((p) => (p.id === project.id ? updatedProject : p));
      }
      return [...prev, updatedProject];
    });

    markStageComplete('Explore');

    // Build intelligent activity log reflecting user's chosen channels & topics
    const channelLabel =
      subscription.channel === 'both'
        ? 'WhatsApp & Email'
        : subscription.channel === 'whatsapp'
        ? 'WhatsApp'
        : 'Email';

    const topicsCount = Object.values(subscription.topics).filter(Boolean).length;

    const logItem: ActivityLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      title: `${project.name} Followed via ${channelLabel}`,
      subtitle: `${topicsCount} topic alerts enabled · ${subscription.contactValue}`,
      type: 'project',
    };
    setActivityLog((prev) => [logItem, ...prev]);

    if (sourceCoords) {
      triggerFlyingAnimation(sourceCoords, project.name, project.image);
    }
  };

  const unsubscribeProject = (projectId: string) => {
    setFollowedProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const isProjectFollowed = (id: string) => followedProjects.some((p) => p.id === id);

  const getProjectSubscription = (projectId: string) => {
    const proj = followedProjects.find((p) => p.id === projectId);
    return proj?.subscription;
  };

  // Surface stories
  const saveFinishStoryToConcepts = (story: FinishPersonality, sourceCoords?: { x: number; y: number }) => {
    markStageComplete('Save');
    const logItem: ActivityLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      title: `${story.title} Finish Story Saved`,
      subtitle: `${story.keyMaterials.join(' · ')}`,
      type: 'finish',
    };
    setActivityLog((prev) => [logItem, ...prev]);

    if (sourceCoords) {
      triggerFlyingAnimation(sourceCoords, story.title, story.primaryImage);
    }
  };

  // Totals
  const totalSavedCount =
    (savedHouse ? 1 : 0) +
    savedMaterials.length +
    followedProjects.length +
    (quizResult ? 1 : 0);

  const totalEstimatedInvestment =
    (savedHouse ? savedHouse.price : currentHouse.price) +
    savedMaterials.reduce((acc, m) => acc + m.pricePerSqm * 40, 0);

  // Dynamic conversion footer logic
  const getDynamicConversion = (): DynamicConversionInfo => {
    if (savedHouse) {
      return {
        headline: `Ready to discuss your ${savedHouse.bedrooms}-bedroom ${savedHouse.style} home?`,
        subtitle: `We'll review your ${savedHouse.priceFormatted} configuration, structural timeline, and prime plot options with our principal architect.`,
        ctaText: `Schedule ${savedHouse.bedrooms}-Bed Consultation`,
        accentBadge: `${savedHouse.bedrooms} Bed · ${savedHouse.style} Selected`,
        category: 'house',
      };
    }
    if (followedProjects.length > 0) {
      const topProj = followedProjects[0];
      const channelText =
        topProj.subscription?.channel === 'whatsapp'
          ? 'WhatsApp'
          : topProj.subscription?.channel === 'email'
          ? 'Email'
          : 'WhatsApp & Email';

      return {
        headline: `Want to know more about ${topProj.name}?`,
        subtitle: `You are receiving updates on ${channelText}. Schedule a private site briefing with our COREN-certified site engineer at ${topProj.location}.`,
        ctaText: `Request ${topProj.name} Briefing`,
        accentBadge: `Following ${topProj.name}`,
        category: 'project',
      };
    }
    if (savedMaterials.length > 0) {
      return {
        headline: 'Ready to turn your selections into a material package?',
        subtitle: `You have ${savedMaterials.length} luxury finishes in your palette. Our procurement team will prepare physical sample swatches and direct Italian factory pricing.`,
        ctaText: 'Request Material Specification',
        accentBadge: `${savedMaterials.length} Materials in Palette`,
        category: 'material',
      };
    }
    if (quizResult) {
      return {
        headline: `Ready to build your ${quizResult.archetypeTitle}?`,
        subtitle: `Matched for your ${quizResult.budget} investment budget in ${quizResult.location}. Groundbreaking timeline: ${quizResult.timeline}.`,
        ctaText: 'Review Custom Plan with Architect',
        accentBadge: 'Quiz Recommendation Ready',
        category: 'quiz',
      };
    }
    return {
      headline: 'Ready to start your home journey?',
      subtitle: 'Join thousands of Nigerians who are already designing, building and owning their dream homes with TVICL.',
      ctaText: 'Start Your Journey',
      accentBadge: 'Private Architectural Practice',
      category: 'default',
    };
  };

  const dynamicConversion = getDynamicConversion();

  const resetJourney = () => {
    setSavedHouse(null);
    setSavedMaterials([]);
    setFollowedProjects([]);
    setQuizResult(null);
    setCompletedStages({
      Discover: true,
      Explore: false,
      Configure: false,
      Save: false,
      Engage: false,
      Request: false,
      Qualify: false,
    });
    setActiveStage('Discover');
  };

  // Scroll listener to update Discover / Explore automatically
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300 && !completedStages.Explore) {
        markStageComplete('Explore');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [completedStages.Explore]);

  return (
    <BuyerJourneyContext.Provider
      value={{
        completedStages,
        activeStage,
        setStageActive,
        markStageComplete,
        currentBedrooms,
        setBedrooms: (count) => {
          setCurrentBedrooms(count);
          markStageComplete('Configure');
        },
        currentStyle,
        setStyle: (style) => {
          setCurrentStyle(style);
          markStageComplete('Configure');
        },
        currentHouse,
        savedHouse,
        saveCurrentHouse,
        savedMaterials,
        addMaterialToConcepts,
        removeMaterialFromConcepts,
        isMaterialSaved,
        smartSettings,
        updateSmartLighting,
        setTargetTemp,
        toggleSecurity,
        toggleAmbientSound,
        saveSmartSettingsToConcepts,
        followedProjects,
        projectToFollow,
        setProjectToFollow,
        openFollowSubscription,
        saveProjectSubscription,
        unsubscribeProject,
        isProjectFollowed,
        getProjectSubscription,
        activeFinishStory,
        setActiveFinishStory,
        saveFinishStoryToConcepts,
        quizResult,
        setQuizResult: (res) => {
          setQuizResult(res);
          markStageComplete('Qualify');
        },
        activityLog,
        totalSavedCount,
        totalEstimatedInvestment,
        isPulseHeaderBadge,
        isConceptDrawerOpen,
        setIsConceptDrawerOpen,
        isQuizModalOpen,
        setIsQuizModalOpen,
        is3DModalOpen,
        setIs3DModalOpen,
        isConsultationModalOpen,
        setIsConsultationModalOpen,
        selectedInspectionProject,
        setSelectedInspectionProject,
        isSearchModalOpen,
        setIsSearchModalOpen,
        flyingParticles,
        triggerFlyingAnimation,
        clearFlyingParticle,
        dynamicConversion,
        resetJourney,
      }}
    >
      {children}
    </BuyerJourneyContext.Provider>
  );
};

export const useBuyerJourney = () => {
  const context = useContext(BuyerJourneyContext);
  if (!context) {
    throw new Error('useBuyerJourney must be used within a BuyerJourneyProvider');
  }
  return context;
};

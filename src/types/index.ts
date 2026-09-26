export type BedroomCount = 3 | 4 | 5 | 6;
export type ArchitecturalStyle = 'Modern' | 'Classic' | 'Contemporary';

export interface HouseConfig {
  bedrooms: BedroomCount;
  bathrooms: number;
  style: ArchitecturalStyle;
  price: number;
  priceFormatted: string;
  areaSqm: number;
  parkingSpaces: number;
  tagline: string;
  image: string;
  additionalImages: string[];
  features: string[];
  floorPlanSummary: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  finishType: string;
  rooms: string[];
  image: string;
  origin: string;
  pricePerSqm: number;
  pricePerSqmFormatted: string;
  description: string;
  textures: {
    roughness: string;
    specular: string;
  };
}

export type ConstructionStatus = 'Completed' | 'In Progress' | 'Inspection Passed' | 'Upcoming';

export type FollowNotificationChannel =
  | 'whatsapp'
  | 'instagram'
  | 'messenger'
  | 'linkedin'
  | 'telegram'
  | 'email'
  | 'both';

export interface FollowNotificationTopics {
  construction: boolean;
  photosVideos: boolean;
  pricing: boolean;
  availability: boolean;
  inspections: boolean;
}

export interface ProjectSubscription {
  projectId: string;
  projectName: string;
  followedAt: string;
  channel: FollowNotificationChannel;
  inApp: boolean;
  contactValue: string; // phone, IG handle, FB handle, or email
  emailValue?: string;
  socialHandle?: string;
  topics: FollowNotificationTopics;
  status: 'ACTIVE' | 'PAUSED';
}

export interface ConstructionProject {
  id: string;
  name: string;
  location: string;
  headline: string;
  timestamp: string;
  dateFormatted: string;
  progressPercent?: number;
  stage: 'Foundation' | 'Structure' | 'Roofing' | 'MEP' | 'Finishing';
  status: ConstructionStatus;
  statusType: 'check' | 'progress' | 'trowel';
  image: string;
  siteEngineer: string;
  architect: string;
  recentMilestone: string;
  isFollowing?: boolean;
  subscription?: ProjectSubscription;
}

export type SmartLightingMode = 'daylight' | 'warm-evening' | 'night-cinema';

export interface SmartHomeSettings {
  lightingMode: SmartLightingMode;
  targetTemp: number;
  securityArmed: boolean;
  ambientSound: boolean;
  activeZone: string;
}

export type FinishStory = 'Warm' | 'Modern' | 'Statement';

export interface FinishPersonality {
  id: FinishStory;
  title: string;
  subtitle: string;
  description: string;
  primaryImage: string;
  paletteColors: { name: string; hex: string }[];
  keyMaterials: string[];
  ambienceLighting: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  location: string;
  homeModel: string;
  quote: string;
  image: string;
  year: string;
}

export type JourneyStage = 
  | 'Discover' 
  | 'Explore' 
  | 'Configure' 
  | 'Save' 
  | 'Engage' 
  | 'Request' 
  | 'Qualify';

export interface ConceptBoardState {
  houseConfig: HouseConfig | null;
  savedMaterials: MaterialItem[];
  smartHomeSettings: SmartHomeSettings | null;
  followedProjects: ConstructionProject[];
  savedFinishStory: FinishPersonality | null;
  quizResult: {
    budget: string;
    location: string;
    style: string;
    timeline: string;
    recommendationTitle: string;
  } | null;
  activityLog: {
    id: string;
    timestamp: string;
    title: string;
    type: 'house' | 'material' | 'smart' | 'project' | 'quiz';
  }[];
}

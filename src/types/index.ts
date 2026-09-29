export type LaptopCondition = 'Brand New' | 'UK Used / Grade A' | 'Refurbished' | 'Open Box';

export interface LaptopProduct {
  id: string;
  name: string;
  brand: 'HP' | 'Dell' | 'Lenovo' | 'Apple' | 'ASUS' | 'Acer';
  modelNumber: string;
  processor: string;
  ram: string;
  storage: string;
  screenSize: string;
  displayResolution?: string;
  graphics?: string;
  operatingSystem: string;
  batteryLife?: string;
  condition: LaptopCondition;
  price: number;
  originalPrice?: number;
  availability: 'In Stock' | 'Limited Stock' | 'Pre-Order';
  stockCount?: number;
  imageUrl: string;
  description: string;
  keyFeatures: string[];
  isDemoSample: boolean;
}

export interface RepairService {
  id: string;
  name: string;
  category: 'Hardware' | 'Screen & Display' | 'Power & Battery' | 'Software & OS' | 'Data & Upgrades';
  icon: string;
  shortDescription: string;
  detailedDescription: string;
  estimatedTurnaround: string;
  startingPrice?: string;
  warrantyPeriod?: string;
}

export interface BusinessConfig {
  businessName: string;
  logoUrl?: string;
  slogan: string;
  taglineSecondary: string;
  phone: string;
  phoneSecondary?: string;
  whatsappNumber: string;
  email: string;
  ownerEmailConfig: string;
  formspreeEndpoint: string;
  address: string;
  city: string;
  stateOrRegion: string;
  country: string;
  openingHours: string;
  currencySymbol: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  tiktokUrl?: string;
  accentTheme: 'cyan' | 'blue' | 'emerald' | 'amber';
  heroImageUrl?: string;
  heroDisplayMode?: 'showcase' | 'flyer';
  flyerImageUrl?: string;
}

export interface RepairBookingRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  deviceModel: string;
  serviceId: string;
  serviceName: string;
  problemDescription: string;
  preferredDate?: string;
  status: 'Pending' | 'In Review' | 'Contacted';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  subject: string;
  message: string;
  productOfInterest?: string;
  createdAt: string;
}

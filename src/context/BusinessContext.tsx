import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BusinessConfig, 
  LaptopProduct, 
  RepairService, 
  RepairBookingRequest, 
  ContactMessage, 
  LaptopCondition 
} from '../types';
import { 
  DEFAULT_BUSINESS_CONFIG, 
  INITIAL_LAPTOP_PRODUCTS, 
  INITIAL_REPAIR_SERVICES 
} from '../data/initialData';

interface BusinessContextType {
  businessConfig: BusinessConfig;
  updateBusinessConfig: (newConfig: Partial<BusinessConfig>) => void;
  resetBusinessConfig: () => void;
  laptops: LaptopProduct[];
  repairServices: RepairService[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedCondition: string;
  setSelectedCondition: (condition: string) => void;
  selectedRam: string;
  setSelectedRam: (ram: string) => void;
  selectedStorage: string;
  setSelectedStorage: (storage: string) => void;
  selectedPriceSort: 'none' | 'low-high' | 'high-low';
  setSelectedPriceSort: (sort: 'none' | 'low-high' | 'high-low') => void;
  filteredLaptops: LaptopProduct[];
  selectedLaptopModal: LaptopProduct | null;
  setSelectedLaptopModal: (laptop: LaptopProduct | null) => void;
  selectedRepairForBooking: RepairService | null;
  setSelectedRepairForBooking: (service: RepairService | null) => void;
  repairBookings: RepairBookingRequest[];
  addRepairBooking: (booking: Omit<RepairBookingRequest, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  contactMessages: ContactMessage[];
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt'>) => Promise<boolean>;
  isConfigDrawerOpen: boolean;
  setIsConfigDrawerOpen: (open: boolean) => void;
  isFlyerModalOpen: boolean;
  setIsFlyerModalOpen: (open: boolean) => void;
  showPreloader: boolean;
  setShowPreloader: (show: boolean) => void;
  triggerPreloader: () => void;
  formatPrice: (amount: number) => string;
  getWhatsAppLink: (customMessage?: string) => string;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'dollytech_business_config',
  LAPTOPS: 'dollytech_laptops',
  BOOKINGS: 'dollytech_repair_bookings',
  MESSAGES: 'dollytech_contact_messages',
};

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_BUSINESS_CONFIG,
          ...parsed,
          address: (!parsed.address || parsed.address === '[BUSINESS ADDRESS]') 
            ? DEFAULT_BUSINESS_CONFIG.address 
            : parsed.address,
          city: (!parsed.city || parsed.city === 'Lagos') 
            ? DEFAULT_BUSINESS_CONFIG.city 
            : parsed.city,
          phone: (!parsed.phone || parsed.phone === '[BUSINESS PHONE]') 
            ? DEFAULT_BUSINESS_CONFIG.phone 
            : parsed.phone,
          whatsappNumber: (!parsed.whatsappNumber || parsed.whatsappNumber === '[BUSINESS WHATSAPP]') 
            ? DEFAULT_BUSINESS_CONFIG.whatsappNumber 
            : parsed.whatsappNumber,
          formspreeEndpoint: parsed.formspreeEndpoint || DEFAULT_BUSINESS_CONFIG.formspreeEndpoint,
          logoUrl: parsed.logoUrl || DEFAULT_BUSINESS_CONFIG.logoUrl || '/dollytech-logo.jpg',
          heroImageUrl: parsed.heroImageUrl || DEFAULT_BUSINESS_CONFIG.heroImageUrl || '/dollytech-hero.jpg',
          flyerImageUrl: parsed.flyerImageUrl || DEFAULT_BUSINESS_CONFIG.flyerImageUrl || '/logo.png',
          heroDisplayMode: parsed.heroDisplayMode || DEFAULT_BUSINESS_CONFIG.heroDisplayMode || 'showcase',
        };
      }
      return DEFAULT_BUSINESS_CONFIG;
    } catch {
      return DEFAULT_BUSINESS_CONFIG;
    }
  });

  const [laptops, setLaptops] = useState<LaptopProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAPTOPS);
      return saved ? JSON.parse(saved) : INITIAL_LAPTOP_PRODUCTS;
    } catch {
      return INITIAL_LAPTOP_PRODUCTS;
    }
  });

  const [repairServices] = useState<RepairService[]>(INITIAL_REPAIR_SERVICES);

  const [repairBookings, setRepairBookings] = useState<RepairBookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedRam, setSelectedRam] = useState('All');
  const [selectedStorage, setSelectedStorage] = useState('All');
  const [selectedPriceSort, setSelectedPriceSort] = useState<'none' | 'low-high' | 'high-low'>('none');

  // Modal / Interaction states
  const [selectedLaptopModal, setSelectedLaptopModal] = useState<LaptopProduct | null>(null);
  const [selectedRepairForBooking, setSelectedRepairForBooking] = useState<RepairService | null>(null);
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  const triggerPreloader = () => {
    setShowPreloader(true);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(businessConfig));
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  }, [businessConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LAPTOPS, JSON.stringify(laptops));
    } catch (e) {
      console.error('Failed to save laptops to localStorage', e);
    }
  }, [laptops]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(repairBookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [repairBookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(contactMessages));
    } catch (e) {
      console.error('Failed to save messages to localStorage', e);
    }
  }, [contactMessages]);

  const updateBusinessConfig = (newConfig: Partial<BusinessConfig>) => {
    setBusinessConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetBusinessConfig = () => {
    setBusinessConfig(DEFAULT_BUSINESS_CONFIG);
    setLaptops(INITIAL_LAPTOP_PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.LAPTOPS);
  };

  const addRepairBooking = async (bookingData: Omit<RepairBookingRequest, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    const endpoint = businessConfig.formspreeEndpoint || 'https://formspree.io/f/xyezlebw';

    const payload = {
      _subject: `[DollyTech Repair Booking] ${bookingData.fullName} - ${bookingData.deviceModel}`,
      form_type: 'Laptop & Computer Repair Request',
      name: bookingData.fullName,
      email: bookingData.emailAddress,
      _replyto: bookingData.emailAddress,
      phone: bookingData.phoneNumber,
      device_model: bookingData.deviceModel,
      requested_service: bookingData.serviceName,
      problem_description: bookingData.problemDescription,
      preferred_schedule: bookingData.preferredDate || 'Earliest available',
      store_location: `${businessConfig.address}, ${businessConfig.city}`,
      submitted_at: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.warn('Formspree response not ok, status:', response.status);
      }
    } catch (error) {
      console.error('Error delivering repair booking to Formspree:', error);
    }

    const newBooking: RepairBookingRequest = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setRepairBookings(prev => [newBooking, ...prev]);
    return true;
  };

  const addContactMessage = async (messageData: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<boolean> => {
    const endpoint = businessConfig.formspreeEndpoint || 'https://formspree.io/f/xyezlebw';

    const payload = {
      _subject: `[DollyTech Inquiry] ${messageData.subject} - ${messageData.fullName}`,
      form_type: 'General Website Contact / Inquiry',
      name: messageData.fullName,
      email: messageData.emailAddress,
      _replyto: messageData.emailAddress,
      phone: messageData.phoneNumber,
      subject: messageData.subject,
      product_of_interest: messageData.productOfInterest || 'General Tech Inquiry',
      message: messageData.message,
      store_location: `${businessConfig.address}, ${businessConfig.city}`,
      submitted_at: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.warn('Formspree response not ok, status:', response.status);
      }
    } catch (error) {
      console.error('Error delivering contact message to Formspree:', error);
    }

    const newMessage: ContactMessage = {
      ...messageData,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setContactMessages(prev => [newMessage, ...prev]);
    return true;
  };

  const formatPrice = (amount: number) => {
    const symbol = businessConfig.currencySymbol || '₦';
    return `${symbol}${amount.toLocaleString('en-NG')}`;
  };

  const getWhatsAppLink = (customMessage?: string) => {
    const rawNumber = businessConfig.whatsappNumber || businessConfig.phone || '';
    let cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const defaultMsg = "Hello DollyTech Solution, I am interested in your laptop and computer repair services.";
    const text = encodeURIComponent(customMessage || defaultMsg);
    
    // Format Nigerian local numbers (e.g. 08179329620 -> 2348179329620)
    if (cleanNumber.startsWith('0') && cleanNumber.length === 11) {
      cleanNumber = '234' + cleanNumber.substring(1);
    }
    
    // If placeholder or empty, link will use phone or alert
    if (!cleanNumber || cleanNumber.length < 5) {
      return `https://wa.me/?text=${text}`;
    }
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  // Filter calculation
  const filteredLaptops = laptops.filter(laptop => {
    // Search query matches name, brand, processor, ram, storage
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = laptop.name.toLowerCase().includes(q);
      const matchBrand = laptop.brand.toLowerCase().includes(q);
      const matchProcessor = laptop.processor.toLowerCase().includes(q);
      const matchRam = laptop.ram.toLowerCase().includes(q);
      const matchStorage = laptop.storage.toLowerCase().includes(q);
      const matchModel = laptop.modelNumber.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchProcessor && !matchRam && !matchStorage && !matchModel) {
        return false;
      }
    }

    // Brand filter
    if (selectedBrand !== 'All' && laptop.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
      return false;
    }

    // Condition filter
    if (selectedCondition !== 'All') {
      if (selectedCondition === 'Brand New' && laptop.condition !== 'Brand New') return false;
      if (selectedCondition === 'UK Used / Refurbished' && laptop.condition === 'Brand New') return false;
    }

    // RAM filter
    if (selectedRam !== 'All') {
      if (!laptop.ram.toLowerCase().includes(selectedRam.toLowerCase())) {
        return false;
      }
    }

    // Storage filter
    if (selectedStorage !== 'All') {
      if (!laptop.storage.toLowerCase().includes(selectedStorage.toLowerCase())) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (selectedPriceSort === 'low-high') return a.price - b.price;
    if (selectedPriceSort === 'high-low') return b.price - a.price;
    return 0;
  });

  return (
    <BusinessContext.Provider value={{
      businessConfig,
      updateBusinessConfig,
      resetBusinessConfig,
      laptops,
      repairServices,
      searchQuery,
      setSearchQuery,
      selectedBrand,
      setSelectedBrand,
      selectedCondition,
      setSelectedCondition,
      selectedRam,
      setSelectedRam,
      selectedStorage,
      setSelectedStorage,
      selectedPriceSort,
      setSelectedPriceSort,
      filteredLaptops,
      selectedLaptopModal,
      setSelectedLaptopModal,
      selectedRepairForBooking,
      setSelectedRepairForBooking,
      repairBookings,
      addRepairBooking,
      contactMessages,
      addContactMessage,
      isConfigDrawerOpen,
      setIsConfigDrawerOpen,
      isFlyerModalOpen,
      setIsFlyerModalOpen,
      showPreloader,
      setShowPreloader,
      triggerPreloader,
      formatPrice,
      getWhatsAppLink
    }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

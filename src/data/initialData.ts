import { BusinessConfig, LaptopProduct, RepairService } from '../types';

export const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  businessName: 'DollyTech Solution',
  logoUrl: '/logo.png',
  slogan: 'Quality Laptops. Reliable Repairs. Professional Service.',
  taglineSecondary: 'Your trusted hub for certified enterprise laptops, genuine parts, and precision motherboard repairs.',
  phone: '08179329620',
  phoneSecondary: '',
  whatsappNumber: '08179329620',
  email: '[BUSINESS EMAIL]',
  ownerEmailConfig: '[REPLACE_WITH_BUSINESS_EMAIL]',
  formspreeEndpoint: 'https://formspree.io/f/xyezlebw',
  address: '16, Onawale Street, off Ire-Akari Road',
  city: 'Isolo, Lagos',
  stateOrRegion: 'Lagos State',
  country: 'Nigeria',
  openingHours: 'Mon - Sat: 8:30 AM – 6:30 PM | Sunday: Closed',
  currencySymbol: '₦',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  twitterUrl: 'https://twitter.com',
  accentTheme: 'cyan',
  heroImageUrl: '/dollytech-hero.jpg',
  flyerImageUrl: '/logo.png',
  heroDisplayMode: 'showcase',
};

export const INITIAL_LAPTOP_PRODUCTS: LaptopProduct[] = [
  {
    id: 'lap-01',
    name: 'HP EliteBook 840 G6 Ultrabook',
    brand: 'HP',
    modelNumber: '840 G6',
    processor: 'Intel Core i7-8665U (Up to 4.8GHz)',
    ram: '16GB DDR4',
    storage: '512GB NVMe M.2 SSD',
    screenSize: '14.0" Full HD IPS (1920x1080) Anti-Glare',
    displayResolution: '1920 x 1080',
    graphics: 'Intel UHD Graphics 620',
    operatingSystem: 'Windows 11 Pro 64-bit Genuine',
    batteryLife: 'Up to 7 Hours (Health 92%+)',
    condition: 'UK Used / Grade A',
    price: 385000,
    originalPrice: 420000,
    availability: 'In Stock',
    stockCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    description: 'Military-grade durable aluminum chassis, backlit keyboard, fingerprint biometric reader, and crystal-clear Bang & Olufsen tuned audio. Fully inspected with 30-point diagnostics.',
    keyFeatures: [
      'Backlit Ergonomic Keyboard',
      'Thunderbolt 3 / USB-C Port',
      'Bang & Olufsen Dual Speakers',
      'Fingerprint & Windows Hello IR Face Unlock',
      'Military Grade Durability (MIL-STD 810G)'
    ],
    isDemoSample: true
  },
  {
    id: 'lap-02',
    name: 'Dell Latitude 7490 Business Class',
    brand: 'Dell',
    modelNumber: 'Latitude 7490',
    processor: 'Intel Core i5-8350U Quad-Core (Up to 3.6GHz)',
    ram: '16GB DDR4 High Speed',
    storage: '256GB High-Speed SSD',
    screenSize: '14.0" FHD IPS Display',
    displayResolution: '1920 x 1080',
    graphics: 'Intel UHD Graphics 620',
    operatingSystem: 'Windows 10 / 11 Pro Ready',
    batteryLife: 'Up to 6 Hours',
    condition: 'UK Used / Grade A',
    price: 320000,
    originalPrice: 350000,
    availability: 'In Stock',
    stockCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    description: 'Carbon fiber reinforced lid with magnesium alloy chassis. Built specifically for demanding corporate and developer workloads with full suite of connectivity ports.',
    keyFeatures: [
      'Dual Band Wi-Fi & Bluetooth 4.2',
      'Full HDMI, USB 3.1 & USB-C DisplayPort',
      'Spill-Resistant Backlit Keyboard',
      'Precision Multi-Touch Glass Trackpad'
    ],
    isDemoSample: true
  },
  {
    id: 'lap-03',
    name: 'Apple MacBook Pro 14" (Apple M1 Pro)',
    brand: 'Apple',
    modelNumber: 'A2442 Space Gray',
    processor: 'Apple M1 Pro 8-Core CPU / 14-Core GPU',
    ram: '16GB Unified Memory',
    storage: '512GB Ultra-Fast PCIe SSD',
    screenSize: '14.2" Liquid Retina XDR (120Hz ProMotion)',
    displayResolution: '3024 x 1964 Mini-LED',
    graphics: '14-Core Integrated Apple GPU',
    operatingSystem: 'macOS Sonoma (Latest Release)',
    batteryLife: 'Up to 14 Hours (Battery Cycle < 45)',
    condition: 'UK Used / Grade A',
    price: 1350000,
    originalPrice: 1450000,
    availability: 'Limited Stock',
    stockCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'Top-tier workstation for video editors, music producers, 3D designers, and software engineers. Features 1000 nits sustained brightness and MagSafe 3 high-speed charging.',
    keyFeatures: [
      'Liquid Retina XDR with 1,000,000:1 Contrast',
      '1080p FaceTime HD Camera with Studio Mics',
      'Six-Speaker Sound System with Spatial Audio',
      'HDMI Port, SDXC Card Slot, 3x Thunderbolt 4'
    ],
    isDemoSample: true
  },
  {
    id: 'lap-04',
    name: 'Lenovo ThinkPad T14 Gen 2 Heavy Duty',
    brand: 'Lenovo',
    modelNumber: 'ThinkPad T14 Gen 2',
    processor: 'Intel Core i7-1165G7 11th Gen (Up to 4.7GHz)',
    ram: '16GB DDR4 3200MHz',
    storage: '512GB PCIe Gen4 NVMe SSD',
    screenSize: '14.0" FHD IPS 300 nits',
    displayResolution: '1920 x 1080',
    graphics: 'Intel Iris Xe Graphics',
    operatingSystem: 'Windows 11 Pro Genuine',
    batteryLife: 'Up to 8 Hours',
    condition: 'Brand New',
    price: 680000,
    originalPrice: 720000,
    availability: 'In Stock',
    stockCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    description: 'Legendary ThinkPad reliability and comfortable tactile keyboard with red TrackPoint. Built for extreme workloads, coding, enterprise data, and long hours.',
    keyFeatures: [
      'Legendary Spill-Resistant ThinkPad Keyboard',
      'ThinkShutter Physical Webcam Privacy Slider',
      'Thunderbolt 4 & RJ-45 Ethernet Gigabit Port',
      'Rapid Charge Technology (80% in 60 mins)'
    ],
    isDemoSample: true
  },
  {
    id: 'lap-05',
    name: 'ASUS ZenBook 14 Ultra-Slim NanoEdge',
    brand: 'ASUS',
    modelNumber: 'UX425EA',
    processor: 'Intel Core i7-1165G7 (12MB Cache)',
    ram: '16GB LPDDR4X',
    storage: '512GB M.2 PCIe SSD',
    screenSize: '14.0" 100% sRGB 400 nits Four-Sided NanoEdge',
    displayResolution: '1920 x 1080',
    graphics: 'Intel Iris Xe Graphics',
    operatingSystem: 'Windows 11 Home / Pro',
    batteryLife: 'Up to 10 Hours',
    condition: 'Open Box',
    price: 590000,
    originalPrice: 630000,
    availability: 'In Stock',
    stockCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    description: 'Precision-crafted diamond-cut aluminum chassis weighing just 1.17kg. Features ErgoLift hinge for optimized typing ergonomics and improved cooling.',
    keyFeatures: [
      'Innovative NumberPad 2.0 LED on Glass Touchpad',
      'ErgoLift Hinge for Optimal Typing & Thermals',
      'Harman Kardon Certified Audio System',
      'Ultra-Lightweight 1.17kg Magnesium-Lithium Alloy'
    ],
    isDemoSample: true
  },
  {
    id: 'lap-06',
    name: 'Dell XPS 13 9305 InfinityEdge',
    brand: 'Dell',
    modelNumber: 'XPS 13 9305',
    processor: 'Intel Core i5-1135G7 (Quad Core up to 4.2GHz)',
    ram: '8GB LPDDR4x Dual Channel',
    storage: '256GB M.2 PCIe NVMe SSD',
    screenSize: '13.3" FHD (1920x1080) InfinityEdge Non-Touch',
    displayResolution: '1920 x 1080',
    graphics: 'Intel Iris Xe Graphics',
    operatingSystem: 'Windows 11 Home Genuine',
    batteryLife: 'Up to 9 Hours',
    condition: 'Refurbished',
    price: 495000,
    originalPrice: 535000,
    availability: 'Limited Stock',
    stockCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    description: 'Precision cut from a single block of aluminum with woven carbon fiber palm rest. Razor-thin bezels deliver maximum screen space in a compact 11-inch frame.',
    keyFeatures: [
      'CNC Machined Aluminum with Carbon Fiber Rest',
      'Waves MaxxAudio Pro Tuned Speakers',
      'Dual Thunderbolt 4 Ports with Power Delivery',
      'Corning Gorilla Glass 4 scratch-resistant display'
    ],
    isDemoSample: true
  },
  {
    id: 'lap-07',
    name: 'HP Pavilion 15 Gaming / Workstation',
    brand: 'HP',
    modelNumber: 'Pavilion 15-dk',
    processor: 'Intel Core i5-10300H High Performance (4.5GHz)',
    ram: '16GB DDR4 2933MHz (Dual Slot Upgradeable)',
    storage: '512GB NVMe SSD + 1TB HDD Slot',
    screenSize: '15.6" Full HD IPS Micro-Edge 144Hz',
    displayResolution: '1920 x 1080',
    graphics: 'NVIDIA GeForce GTX 1650 4GB GDDR6',
    operatingSystem: 'Windows 11 Home',
    batteryLife: 'Up to 4.5 Hours',
    condition: 'UK Used / Grade A',
    price: 460000,
    originalPrice: 490000,
    availability: 'In Stock',
    stockCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    description: 'Dual fan cooling system with wide rear corner vents and enlarged air inlets to maximize airflow. Ideal for graphic designers, AutoCAD, video creators, and gaming.',
    keyFeatures: [
      'Dedicated NVIDIA GeForce GTX 1650 4GB GPU',
      '144Hz High Refresh Gaming Display',
      'Acid Green Backlit Full Keyboard with NumPad',
      'Dual Sensor Thermal Management System'
    ],
    isDemoSample: true
  },
  {
    id: 'lap-08',
    name: 'Acer Swift 3 Metal Body Lightweight',
    brand: 'Acer',
    modelNumber: 'Swift 3 SF314',
    processor: 'AMD Ryzen 5 5500U 6-Core / 12-Threads',
    ram: '8GB LPDDR4X',
    storage: '512GB PCIe Gen3 NVMe SSD',
    screenSize: '14.0" Full HD IPS Widescreen LED-Backlit',
    displayResolution: '1920 x 1080',
    graphics: 'AMD Radeon RX Vega 7 Graphics',
    operatingSystem: 'Windows 11 Home',
    batteryLife: 'Up to 8.5 Hours',
    condition: 'Brand New',
    price: 430000,
    originalPrice: 465000,
    availability: 'In Stock',
    stockCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek silver all-aluminum metal design. Powered by 6 physical Zen 2 CPU cores for smooth multi-tasking, office productivity, and student coursework.',
    keyFeatures: [
      'Powerful 6-Core 12-Thread AMD Ryzen 5 CPU',
      'Fingerprint Reader for Quick Windows Login',
      'Full HD IPS Display with 82.73% Screen-to-Body',
      'USB Type-C 10Gbps Multi-Function Port'
    ],
    isDemoSample: true
  }
];

export const INITIAL_REPAIR_SERVICES: RepairService[] = [
  {
    id: 'rep-diag',
    name: 'Comprehensive Laptop Diagnostics',
    category: 'Hardware',
    icon: 'Cpu',
    shortDescription: 'In-depth 30-point motherboard, electrical power rail, RAM, and thermals assessment.',
    detailedDescription: 'We connect your laptop to our professional oscilloscope, DC lab power supply, and hardware analyzers to locate short circuits, blown capacitors, corrupted BIOS chips, or faulty IC controllers.',
    estimatedTurnaround: '1 – 3 Hours',
    startingPrice: 'Free with Approved Repair',
    warrantyPeriod: 'Diagnostic Report Included'
  },
  {
    id: 'rep-screen',
    name: 'Broken Screen & Display Replacement',
    category: 'Screen & Display',
    icon: 'Monitor',
    shortDescription: 'Original OEM replacement for cracked, flickering, vertical-line, or dead LCD/LED/OLED screens.',
    detailedDescription: 'Full panel replacement using grade-A factory original panels matching exact resolution, refresh rate, and color gamut (Full HD, 2K, 4K Retina, 120Hz/144Hz).',
    estimatedTurnaround: 'Same Day (2 – 4 Hours)',
    startingPrice: 'Inquire for Model Quote',
    warrantyPeriod: '90 Days Warranty'
  },
  {
    id: 'rep-battery',
    name: 'Battery Replacement & Calibration',
    category: 'Power & Battery',
    icon: 'BatteryCharging',
    shortDescription: 'Swollen, rapidly discharging, or service-recommended battery replacement with original cells.',
    detailedDescription: 'Safe removal of degraded or bulging lithium-ion battery packs. Installation of brand-new, fresh date-coded OEM batteries with proper SMC/BMS calibration.',
    estimatedTurnaround: '1 – 2 Hours',
    startingPrice: 'Contact for Model',
    warrantyPeriod: '6 Months Warranty'
  },
  {
    id: 'rep-keyboard',
    name: 'Keyboard & Trackpad Replacement',
    category: 'Hardware',
    icon: 'Keyboard',
    shortDescription: 'Fix sticky, unresponsive, liquid-damaged, or missing keycaps with genuine keyboards.',
    detailedDescription: 'Full replacement of integrated top-case or riveted keyboards, backlit models, and precision capacitive glass trackpads for HP, Dell, ThinkPad, and MacBooks.',
    estimatedTurnaround: 'Same Day (2 – 4 Hours)',
    startingPrice: 'Model Specific',
    warrantyPeriod: '90 Days Warranty'
  },
  {
    id: 'rep-charging',
    name: 'Charging Port & Type-C DC Jack Repair',
    category: 'Power & Battery',
    icon: 'Zap',
    shortDescription: 'Fix loose ports, laptop not charging, burnt USB-C ports, and broken pin connectors.',
    detailedDescription: 'Micro-soldering repair or modular harness replacement of broken DC charging jacks, Thunderbolt / USB-C controller chips, and charging ICs.',
    estimatedTurnaround: '2 – 5 Hours',
    startingPrice: 'Affordable Rates',
    warrantyPeriod: '90 Days Warranty'
  },
  {
    id: 'rep-os',
    name: 'Windows & macOS Operating System Installation',
    category: 'Software & OS',
    icon: 'HardDrive',
    shortDescription: 'Clean installation of genuine Windows 10/11 Pro or macOS with full drivers and optimization.',
    detailedDescription: 'Complete clean install with official manufacturer drivers, partition optimization, activation support, security patches, and lifetime performance stability.',
    estimatedTurnaround: '1 – 2 Hours',
    startingPrice: 'Affordable Fixed Price',
    warrantyPeriod: 'Service Guarantee'
  },
  {
    id: 'rep-software',
    name: 'Software Installation & Productivity Suite Setup',
    category: 'Software & OS',
    icon: 'Layers',
    shortDescription: 'Setup Microsoft 365 Office, design suites, developer IDEs, PDF tools, and antivirus.',
    detailedDescription: 'Full configuration of productivity suites, Adobe Creative Cloud, AutoCAD, Visual Studio Code, Python, Zoom, browser hardening, and essential daily software.',
    estimatedTurnaround: '1 – 2 Hours',
    startingPrice: 'Package Rates',
    warrantyPeriod: '30 Days Software Support'
  },
  {
    id: 'rep-virus',
    name: 'Virus, Malware & Ransomware Removal',
    category: 'Software & OS',
    icon: 'ShieldAlert',
    shortDescription: 'Complete elimination of spyware, crypto-miners, Trojan horses, and browser hijackers.',
    detailedDescription: 'Deep offline sector scanning, registry cleanup, security hardening, and installation of robust lightweight endpoint protection to keep your data safe.',
    estimatedTurnaround: '2 – 3 Hours',
    startingPrice: 'Affordable Fixed Price',
    warrantyPeriod: '30 Days Clean Guarantee'
  },
  {
    id: 'rep-cleaning',
    name: 'Deep Internal Cleaning & Thermal Repaste',
    category: 'Hardware',
    icon: 'Flame',
    shortDescription: 'Overheating laptop cure: exhaust dust removal and Arctic MX-4 premium thermal paste reapplication.',
    detailedDescription: 'Disassembly of heatsink copper pipes, fan blower ultrasonic cleaning, bearing lubrication, and application of high-conductivity thermal paste to reduce temps by 15°C–25°C.',
    estimatedTurnaround: '1 – 2 Hours',
    startingPrice: 'Quick Service Rate',
    warrantyPeriod: 'Thermal Performance Guaranteed'
  },
  {
    id: 'rep-upgrades',
    name: 'RAM Upgrade & Ultra-Fast NVMe SSD Installation',
    category: 'Data & Upgrades',
    icon: 'TrendingUp',
    shortDescription: 'Speed up sluggish laptops up to 10x with high-speed SSDs and dual-channel RAM modules.',
    detailedDescription: 'Upgrade old mechanical spinning HDDs to 256GB / 512GB / 1TB / 2TB Gen3 & Gen4 NVMe M.2 Solid State Drives. Expand RAM up to 16GB, 32GB, or 64GB with zero data loss.',
    estimatedTurnaround: '1 – 2 Hours',
    startingPrice: 'Hardware + Service',
    warrantyPeriod: '1 Year SSD/RAM Warranty'
  },
  {
    id: 'rep-data',
    name: 'Data Recovery & Emergency Backup Service',
    category: 'Data & Upgrades',
    icon: 'Database',
    shortDescription: 'Recover lost files, documents, and photos from crashed laptops, formatted drives, and dead boards.',
    detailedDescription: 'Recovery from clicking hard drives, corrupted SSD partitions, unbootable Windows systems, and liquid-damaged motherboards with secure confidential handling.',
    estimatedTurnaround: '24 – 48 Hours',
    startingPrice: 'Evaluation Dependent',
    warrantyPeriod: 'No Data, No Charge'
  },
  {
    id: 'rep-hinge',
    name: 'Hinge Repair & Casing Reconstruction',
    category: 'Hardware',
    icon: 'Wrench',
    shortDescription: 'Repair cracked laptop corners, broken hinges, separated palm rests, and lid bezels.',
    detailedDescription: 'Structural epoxy reinforcement, brass screw bushing reconstruction, and hinge tension adjustment to ensure smooth one-handed opening without breaking the display.',
    estimatedTurnaround: 'Same Day / Next Day',
    startingPrice: 'Model Dependent',
    warrantyPeriod: '90 Days Warranty'
  }
];

export const SUPPORTED_BRANDS = [
  {
    name: 'HP',
    category: 'EliteBook, ProBook, Pavilion, Spectre, Envy, Victus',
    description: 'Robust enterprise ultrabooks, student laptops, and high-performance gaming rigs with full OEM parts support.',
    modelsCount: '35+ Models Available',
    iconLetter: 'hp'
  },
  {
    name: 'Dell',
    category: 'Latitude, XPS, Inspiron, Precision Workstations, Vostro',
    description: 'Industry-standard durability, dual-fan cooling, and magnesium chassis built for all-day office productivity.',
    modelsCount: '40+ Models Available',
    iconLetter: 'DELL'
  },
  {
    name: 'Lenovo',
    category: 'ThinkPad T/X/E Series, IdeaPad, Yoga, Legion Gaming',
    description: 'Renowned ergonomics, military-spec drop testing, and world-class keyboards designed for coders and writers.',
    modelsCount: '30+ Models Available',
    iconLetter: 'Lenovo'
  },
  {
    name: 'Apple',
    category: 'MacBook Air, MacBook Pro (M1, M2, M3 & Intel Silicon)',
    description: 'Retina XDR displays, silicon battery efficiency, and premium craftsmanship with full macOS support.',
    modelsCount: '15+ Models Available',
    iconLetter: 'Apple'
  },
  {
    name: 'ASUS',
    category: 'ZenBook, VivoBook, ROG Republic of Gamers, TUF Gaming',
    description: 'Innovative dual-screen ErgoLift designs, vibrant OLED panels, and powerhouse graphics for creators.',
    modelsCount: '20+ Models Available',
    iconLetter: 'ASUS'
  },
  {
    name: 'Acer',
    category: 'Swift, Aspire, Predator, Nitro Series',
    description: 'Budget-friendly powerhouses with aluminum finishes, rapid NVMe storage, and dependable everyday speed.',
    modelsCount: '18+ Models Available',
    iconLetter: 'Acer'
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    title: '30-Point Quality Diagnostic Check',
    description: 'Every laptop we sell or repair passes strict checks: battery cycle count, thermal stress test, keyboard keys, display pixels, and port voltages.',
    icon: 'CheckCircle2'
  },
  {
    title: 'Certified Hardware Engineers',
    description: 'Experienced technicians specializing in component-level micro-soldering, short-circuit diagnostics, and clean OEM parts installation.',
    icon: 'Award'
  },
  {
    title: '100% Genuine OEM Replacement Parts',
    description: 'We source original manufacturer screens, high-capacity batteries, keyboards, and charging ports directly to ensure long device lifespan.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Express Same-Day Turnaround',
    description: 'Over 70% of common repairs—including screens, keyboards, batteries, RAM, SSD upgrades, and OS installation—are completed within 2 to 4 hours.',
    icon: 'Clock'
  },
  {
    title: 'Transparent & Fair Pricing',
    description: 'No hidden diagnostic charges or sudden price hikes. You receive a clear, upfront estimate before any repair work commences.',
    icon: 'Tag'
  },
  {
    title: 'Warranty & Dedicated After-Sales Care',
    description: 'Enjoy comprehensive warranty coverage on all laptops and repair services, backed by responsive WhatsApp and in-store customer support.',
    icon: 'Headphones'
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: 'How do I know the laptop condition before purchasing?',
    answer: 'All our laptops are categorized transparently as Brand New, Open Box, or UK Used / Grade A. Grade A units have pristine screens, minimum 85%+ battery health, no cracks or deep scratches, and have undergone thorough 30-point stress testing.'
  },
  {
    question: 'Do you offer warranty on laptops and repair services?',
    answer: 'Yes! All laptop purchases come with a testing warranty and after-sales support. Hardware repair services (screens, batteries, charging ports, keyboards) also carry a minimum 90-day warranty.'
  },
  {
    question: 'Can I request a custom upgrade before buying a laptop?',
    answer: 'Absolutely. We can upgrade the RAM (e.g. from 8GB to 16GB or 32GB) or install a larger 512GB or 1TB high-speed NVMe SSD before delivery or pick-up.'
  },
  {
    question: 'How long does a typical computer repair take?',
    answer: 'Most standard repairs like screen replacement, battery replacement, RAM/SSD installation, deep thermal cleaning, and OS setup take between 1 to 4 hours on the same day. Motherboard micro-soldering typically takes 24 to 48 hours.'
  },
  {
    question: 'How do I pay and do you deliver across Nigeria?',
    answer: 'We accept bank transfers, POS card payments, and cash in-store. We also provide secure, insured door-to-door delivery across Lagos and nationwide to other Nigerian states via trusted logistics partners.'
  }
];

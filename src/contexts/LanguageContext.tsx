import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.generation': 'Power Generation',
    'nav.distribution': 'Distribution',
    'nav.renewable': 'Renewable Energy',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signOut': 'Sign Out',
    'nav.dashboard': 'Dashboard',
    'nav.overview': 'Overview',
    'nav.performance': 'Performance',
    'nav.analytics': 'Analytics',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    
    // Auth
    'auth.welcome': 'Bangladesh Power Development Board',
    'auth.tagline': 'Powering the Nation',
    'auth.welcomeBack': 'Welcome Back',
    'auth.createAccount': 'Create Account',
    'auth.loginDesc': 'Enter your credentials to access your dashboard',
    'auth.registerDesc': 'Register to access the BPDB portal',
    'auth.fullName': 'Full Name',
    'auth.role': 'Role',
    'auth.department': 'Department',
    'auth.hierarchyLevel': 'Hierarchy Level (1-10)',
    'auth.phone': 'Phone (Optional)',
    'auth.facilityType': 'Facility Type',
    'auth.selectFacility': 'Select facility type',
    'auth.powerPlant': 'Power Plant',
    'auth.subStation': 'Sub Station',
    'auth.facilityName': 'Facility Name',
    'auth.selectFacilityName': 'Select facility',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.signIn': 'Sign In',
    'auth.processing': 'Processing...',
    'auth.noAccount': "Don't have an account? Sign up",
    'auth.hasAccount': 'Already have an account? Sign in',
    'auth.quickLogin': 'Quick Login (Dev)',
    
    // Dashboard Common
    'dashboard.chairman': 'Chairman Dashboard',
    'dashboard.director': 'Director Dashboard',
    'dashboard.customer': 'Customer Dashboard',
    'dashboard.welcome': 'Welcome',
    
    // Chairman Dashboard
    'chairman.title': 'Chairman Dashboard',
    'chairman.subtitle': 'Strategic Overview & Performance Monitoring',
    'chairman.totalGeneration': 'Total Generation',
    'chairman.systemEfficiency': 'System Efficiency',
    'chairman.activePlants': 'Active Plants',
    'chairman.workforce': 'Workforce',
    'chairman.kpi': 'Key Performance Indicators',
    'chairman.financialOverview': 'Financial Overview',
    'chairman.generationEfficiency': 'Generation Efficiency',
    'chairman.transmissionReliability': 'Transmission Reliability',
    'chairman.distributionNetwork': 'Distribution Network',
    'chairman.revenue': 'Revenue (Monthly)',
    'chairman.opex': 'Operating Expenses',
    'chairman.netProfit': 'Net Profit',
    'chairman.budgetUtilization': 'Budget Utilization',
    'chairman.operational': 'Operational nationwide',
    'chairman.totalEmployees': 'Total employees',
    
    // Director Dashboard
    'director.title': 'Director Dashboard',
    'director.subtitle': 'Generation Performance & Operations Management',
    'director.powerOutput': 'Power Output',
    'director.plantEfficiency': 'Plant Efficiency',
    'director.alerts': 'Alerts',
    'director.plantPerformance': 'Plant Performance',
    'director.fuelConsumption': 'Fuel Consumption',
    'director.generationCapacity': 'Generation capacity',
    'director.overallPerformance': 'Overall performance',
    'director.currentlyOperational': 'Currently operational',
    'director.requiringAttention': 'Requiring attention',
    'director.gasDaily': 'Gas (Daily)',
    'director.coalDaily': 'Coal (Daily)',
    'director.fuelCost': 'Fuel Cost',
    'director.heatRate': 'Heat Rate',
    
    // Customer Dashboard
    'customer.title': 'Customer Dashboard',
    'customer.subtitle': 'Manage Your Electricity Services',
    'customer.currentBill': 'Current Bill',
    'customer.usage': 'Usage This Month',
    'customer.serviceRequests': 'Service Requests',
    'customer.outageTime': 'Avg. Outage Time',
    'customer.billingHistory': 'Billing History',
    'customer.usageStats': 'Usage Statistics',
    'customer.dueBy': 'Due by',
    'customer.pending': 'pending',
    'customer.completed': 'completed',
    'customer.thisMonth': 'This month',
    'customer.viewAllBills': 'View All Bills',
    'customer.dailyAverage': 'Daily Average',
    'customer.peakUsage': 'Peak Usage Time',
    'customer.comparison': 'Comparison to Similar Homes',
    'customer.energyTips': 'Energy Saving Tips',
    'customer.paid': 'Paid',
    'customer.due': 'Due',
    
    // Footer
    'footer.contact': 'Contact Information',
    'footer.address': 'WASA Bhaban, 98 Kazi Nazrul Islam Avenue, Kawran Bazar, Dhaka-1215',
    'footer.phone': '+880-2-9560000',
    'footer.email': 'info@bpdb.gov.bd',
    'footer.website': 'www.bpdb.gov.bd',
    'footer.quickLinks': 'Quick Links',
    'footer.careers': 'Careers',
    'footer.tenders': 'Tenders',
    'footer.projects': 'Projects',
    'footer.media': 'Media Center',
    'footer.emergency': '24/7 Emergency',
    'footer.copyright': '© 2025 Bangladesh Power Development Board. All rights reserved.',
  },
  bn: {
    // Navigation
    'nav.about': 'সম্পর্কে',
    'nav.generation': 'বিদ্যুৎ উৎপাদন',
    'nav.distribution': 'বিতরণ',
    'nav.renewable': 'নবায়নযোগ্য শক্তি',
    'nav.contact': 'যোগাযোগ',
    'nav.login': 'লগইন',
    'nav.signOut': 'সাইন আউট',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.overview': 'সংক্ষিপ্ত বিবরণ',
    'nav.performance': 'কর্মক্ষমতা',
    'nav.analytics': 'বিশ্লেষণ',
    'nav.reports': 'প্রতিবেদন',
    'nav.settings': 'সেটিংস',
    
    // Auth
    'auth.welcome': 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',
    'auth.tagline': 'জাতির শক্তি',
    'auth.welcomeBack': 'স্বাগতম',
    'auth.createAccount': 'অ্যাকাউন্ট তৈরি করুন',
    'auth.loginDesc': 'আপনার ড্যাশবোর্ড অ্যাক্সেস করতে আপনার শংসাপত্র লিখুন',
    'auth.registerDesc': 'BPDB পোর্টাল অ্যাক্সেস করতে নিবন্ধন করুন',
    'auth.fullName': 'পূর্ণ নাম',
    'auth.role': 'ভূমিকা',
    'auth.department': 'বিভাগ',
    'auth.hierarchyLevel': 'শ্রেণিবিন্যাস স্তর (১-১০)',
    'auth.phone': 'ফোন (ঐচ্ছিক)',
    'auth.facilityType': 'সুবিধার ধরন',
    'auth.selectFacility': 'সুবিধার ধরন নির্বাচন করুন',
    'auth.powerPlant': 'বিদ্যুৎ কেন্দ্র',
    'auth.subStation': 'সাব স্টেশন',
    'auth.facilityName': 'সুবিধার নাম',
    'auth.selectFacilityName': 'সুবিধা নির্বাচন করুন',
    'auth.email': 'ইমেল',
    'auth.password': 'পাসওয়ার্ড',
    'auth.signIn': 'সাইন ইন',
    'auth.processing': 'প্রক্রিয়াকরণ...',
    'auth.noAccount': 'অ্যাকাউন্ট নেই? সাইন আপ করুন',
    'auth.hasAccount': 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে? সাইন ইন করুন',
    'auth.quickLogin': 'দ্রুত লগইন (ডেভ)',
    
    // Dashboard Common
    'dashboard.chairman': 'চেয়ারম্যান ড্যাশবোর্ড',
    'dashboard.director': 'পরিচালক ড্যাশবোর্ড',
    'dashboard.customer': 'গ্রাহক ড্যাশবোর্ড',
    'dashboard.welcome': 'স্বাগতম',
    
    // Chairman Dashboard
    'chairman.title': 'চেয়ারম্যান ড্যাশবোর্ড',
    'chairman.subtitle': 'কৌশলগত সংক্ষিপ্ত বিবরণ এবং কর্মক্ষমতা পর্যবেক্ষণ',
    'chairman.totalGeneration': 'মোট উৎপাদন',
    'chairman.systemEfficiency': 'সিস্টেম দক্ষতা',
    'chairman.activePlants': 'সক্রিয় কেন্দ্র',
    'chairman.workforce': 'কর্মীবাহিনী',
    'chairman.kpi': 'মূল কর্মক্ষমতা সূচক',
    'chairman.financialOverview': 'আর্থিক সংক্ষিপ্ত বিবরণ',
    'chairman.generationEfficiency': 'উৎপাদন দক্ষতা',
    'chairman.transmissionReliability': 'ট্রান্সমিশন নির্ভরযোগ্যতা',
    'chairman.distributionNetwork': 'বিতরণ নেটওয়ার্ক',
    'chairman.revenue': 'রাজস্ব (মাসিক)',
    'chairman.opex': 'পরিচালন ব্যয়',
    'chairman.netProfit': 'নিট লাভ',
    'chairman.budgetUtilization': 'বাজেট ব্যবহার',
    'chairman.operational': 'সারাদেশে পরিচালনা',
    'chairman.totalEmployees': 'মোট কর্মচারী',
    
    // Director Dashboard
    'director.title': 'পরিচালক ড্যাশবোর্ড',
    'director.subtitle': 'উৎপাদন কর্মক্ষমতা এবং পরিচালনা ব্যবস্থাপনা',
    'director.powerOutput': 'বিদ্যুৎ উৎপাদন',
    'director.plantEfficiency': 'কেন্দ্র দক্ষতা',
    'director.alerts': 'সতর্কতা',
    'director.plantPerformance': 'কেন্দ্র কর্মক্ষমতা',
    'director.fuelConsumption': 'জ্বালানি ব্যবহার',
    'director.generationCapacity': 'উৎপাদন ক্ষমতা',
    'director.overallPerformance': 'সামগ্রিক কর্মক্ষমতা',
    'director.currentlyOperational': 'বর্তমানে পরিচালনা',
    'director.requiringAttention': 'মনোযোগ প্রয়োজন',
    'director.gasDaily': 'গ্যাস (দৈনিক)',
    'director.coalDaily': 'কয়লা (দৈনিক)',
    'director.fuelCost': 'জ্বালানি খরচ',
    'director.heatRate': 'তাপ হার',
    
    // Customer Dashboard
    'customer.title': 'গ্রাহক ড্যাশবোর্ড',
    'customer.subtitle': 'আপনার বিদ্যুৎ সেবা পরিচালনা করুন',
    'customer.currentBill': 'বর্তমান বিল',
    'customer.usage': 'এই মাসের ব্যবহার',
    'customer.serviceRequests': 'সেবা অনুরোধ',
    'customer.outageTime': 'গড় বিভ্রাট সময়',
    'customer.billingHistory': 'বিলিং ইতিহাস',
    'customer.usageStats': 'ব্যবহারের পরিসংখ্যান',
    'customer.dueBy': 'বকেয়া',
    'customer.pending': 'অমীমাংসিত',
    'customer.completed': 'সম্পন্ন',
    'customer.thisMonth': 'এই মাসে',
    'customer.viewAllBills': 'সব বিল দেখুন',
    'customer.dailyAverage': 'দৈনিক গড়',
    'customer.peakUsage': 'সর্বোচ্চ ব্যবহার সময়',
    'customer.comparison': 'একই ধরনের বাড়ির সাথে তুলনা',
    'customer.energyTips': 'শক্তি সাশ্রয়ের পরামর্শ',
    'customer.paid': 'পরিশোধিত',
    'customer.due': 'বকেয়া',
    
    // Footer
    'footer.contact': 'যোগাযোগের তথ্য',
    'footer.address': 'ওয়াসা ভবন, ৯৮ কাজী নজরুল ইসলাম এভিনিউ, কাওরান বাজার, ঢাকা-১২১৫',
    'footer.phone': '+৮৮০-২-৯৫৬০০০০',
    'footer.email': 'info@bpdb.gov.bd',
    'footer.website': 'www.bpdb.gov.bd',
    'footer.quickLinks': 'দ্রুত লিংক',
    'footer.careers': 'ক্যারিয়ার',
    'footer.tenders': 'টেন্ডার',
    'footer.projects': 'প্রকল্প',
    'footer.media': 'মিডিয়া সেন্টার',
    'footer.emergency': '২৪/৭ জরুরি',
    'footer.copyright': '© ২০২৫ বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড। সর্বস্বত্ব সংরক্ষিত।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

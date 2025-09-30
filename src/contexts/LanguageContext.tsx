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

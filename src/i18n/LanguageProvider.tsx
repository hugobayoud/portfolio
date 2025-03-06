'use client';

import { IntlProvider } from 'next-intl';
import { createContext, useContext, useEffect, useState } from 'react';

import enMessages from './locales/en.json';
import frMessages from './locales/fr.json';

type Language = 'en' | 'fr';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  messages: Record<string, any>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const messages = {
  en: enMessages,
  fr: frMessages,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if there's a saved language preference in localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      // Update html lang attribute
      document.documentElement.lang = language;
    }
  }, [language, isClient]);

  const toggleLanguage = () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
    if (isClient) {
      localStorage.setItem('language', newLanguage);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, messages: messages[language] }}
    >
      <IntlProvider locale={language} messages={messages[language]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

'use client';

import { Language, LanguageContextType, messages } from '@/lib/types/i18n';
import { IntlProvider } from 'next-intl';
import { createContext, useEffect, useState } from 'react';

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [isClient, setIsClient] = useState(false);

  // Setting up the default language based on URL or local storage preferences
  useEffect(() => {
    setIsClient(true);

    // Check URL parameters first
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLanguage = urlParams.get('lg');

      if (urlLanguage === 'en' || urlLanguage === 'fr') {
        setLanguage(urlLanguage);
        localStorage.setItem('language', urlLanguage);
        return;
      }
    }

    // If no URL parameter, check localStorage
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

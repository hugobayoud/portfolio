'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  isLanguage,
  type Language,
  type LanguageContextType,
  messages,
} from '@/lib/types/i18n';

const STORAGE_KEY = 'language';

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

/**
 * Language is pure client state: both locales are bundled with the page, so
 * flipping FR ⇄ EN is instant and never refetches or re-routes.
 *
 * The initial value is French (the canonical copy); after hydration a `?lg=`
 * query parameter wins over the visitor's stored preference, and either one is
 * persisted so the choice sticks on the next visit.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('lg');
    if (isLanguage(fromUrl)) {
      setLanguageState(fromUrl);
      localStorage.setItem(STORAGE_KEY, fromUrl);
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) setLanguageState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, messages: messages[language] }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

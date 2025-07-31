import { LanguageContext } from '@/components/providers/language-providers';
import { useContext } from 'react';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

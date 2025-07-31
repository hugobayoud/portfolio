import enMessages from '../../i18n/locales/en.json';
import frMessages from '../../i18n/locales/fr.json';

export type Messages = typeof enMessages | typeof frMessages;

export type Language = 'en' | 'fr';

export type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  messages: Messages;
};

export const messages = {
  en: enMessages,
  fr: frMessages,
};

import enMessages from '../../i18n/locales/en.json';
import frMessages from '../../i18n/locales/fr.json';

export type Testimonial = {
  author: string;
  role: string;
  photo: string;
  quote: string;
};

export type Experience = {
  id: string;
  /** Company / product name, e.g. `Sapio · Thetys Lab`. */
  company: string;
  /** Sector shown next to the company, e.g. `FinTech · Open Finance`. */
  sector: string;
  role: string;
  /** Pre-formatted, locale-neutral: `04/2025 – 09/2025`. */
  period: string;
  summary: string;
  /** The 5–6 skills this experience is remembered for; rendered as chips. */
  skills: string[];
  /** Square logo. Falls back to a monogram when the file is missing. */
  logo?: string;
  url?: string;
  testimonial?: Testimonial;
};

export type Messages = {
  nav: {
    blog: string;
    french: string;
    english: string;
  };
  profile: {
    name: string;
    headline: string;
    tagline: string;
    photoAlt: string;
    phone: string;
    email: string;
    copyEmail: string;
    emailCopied: string;
    linkedin: string;
    github: string;
    whatsapp: string;
  };
  sections: {
    experience: string;
    education: string;
    ai: string;
  };
  experience: {
    visitSite: string;
    /** Template carrying `{name}`, e.g. "Voir la référence : {name}". */
    seeReference: string;
    close: string;
    items: Experience[];
  };
  education: {
    degree: string;
    detail: string;
  };
  ai: {
    text: string;
  };
};

export type Language = 'en' | 'fr';

export type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  messages: Messages;
};

export const messages: Record<Language, Messages> = {
  fr: frMessages,
  en: enMessages,
};

export function isLanguage(value: unknown): value is Language {
  return value === 'fr' || value === 'en';
}

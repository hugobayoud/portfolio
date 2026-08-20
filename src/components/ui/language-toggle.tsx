'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import type { Language } from '@/lib/types/i18n';

const OPTIONS: { value: Language; short: string }[] = [
  { value: 'fr', short: 'FR' },
  { value: 'en', short: 'EN' },
];

/**
 * FR ⇄ EN segmented toggle. Both locales ship with the page, so switching is a
 * plain state update — no navigation, no fetch, no layout shift.
 */
export function LanguageToggle() {
  const { language, setLanguage, messages } = useLanguage();

  return (
    // No group role: each option already carries its own full-word label and
    // pressed state, so the wrapper is purely visual.
    <div className="inline-flex h-10 items-center gap-0.5 rounded-full bg-quiet p-[3px]">
      {OPTIONS.map(({ value, short }) => {
        const isActive = language === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setLanguage(value)}
            aria-pressed={isActive}
            aria-label={
              value === 'fr' ? messages.nav.french : messages.nav.english
            }
            className={`h-[34px] rounded-full px-3 text-[13px] leading-none tracking-wide transition-[background-color,color,box-shadow] duration-150 ${
              isActive
                ? 'bg-white font-semibold text-navy shadow-[0_1px_2px_rgba(0,0,0,0.10)]'
                : 'text-ink-faint hover:text-ink'
            }`}
          >
            {short}
          </button>
        );
      })}
    </div>
  );
}

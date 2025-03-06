'use client';

import { Button } from '@radix-ui/themes';
import { useLanguage } from '../src/i18n/LanguageProvider';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="soft"
      size="2"
      onClick={toggleLanguage}
      aria-label={`Switch to ${
        language === 'fr' ? 'English' : 'French'
      } language`}
    >
      {language === 'fr' ? 'EN' : 'FR'}
    </Button>
  );
}

'use client';

import { Button } from '@radix-ui/themes';
import { useLanguage } from '../src/i18n/LanguageProvider';

export function LanguageToggle() {
  const { language, toggleLanguage, messages } = useLanguage();

  return (
    <Button
      variant="soft"
      size="2"
      onClick={toggleLanguage}
      aria-label={`${messages.common.language}: ${
        language === 'fr' ? messages.common.english : messages.common.french
      }`}
    >
      {language === 'fr' ? 'EN' : 'FR'}
    </Button>
  );
}

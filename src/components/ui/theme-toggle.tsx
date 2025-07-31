'use client';

import { Button } from '@radix-ui/themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { useTheme } from '@/lib/hooks/use-theme';
import { useLanguage } from '@/lib/hooks/use-language';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { messages } = useLanguage();

  return (
    <Button
      variant="soft"
      size="2"
      onClick={toggleTheme}
      aria-label={`${messages.common.theme}: ${
        theme === 'dark' ? messages.common.light : messages.common.dark
      }`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

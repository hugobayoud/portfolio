'use client';

import { ThemeContextType, ThemeMode } from '@/lib/types/theme';
import { Theme } from '@radix-ui/themes';
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    // Apply theme class to document element
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Theme
        appearance={theme}
        accentColor={theme === 'dark' ? 'amber' : 'blue'}
        grayColor={theme === 'dark' ? 'slate' : 'slate'}
        panelBackground={theme === 'dark' ? 'solid' : 'translucent'}
        scaling="100%"
        radius="medium"
        hasBackground={true}
        className="font-[family-name:var(--font-open-sans)]"
      >
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}

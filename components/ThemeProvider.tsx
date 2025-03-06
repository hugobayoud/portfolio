'use client';

import { Theme } from '@radix-ui/themes';
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'dark' | 'light';

type ThemeContextType = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

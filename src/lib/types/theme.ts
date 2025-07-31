export type ThemeMode = 'dark' | 'light';

export type ThemeContextType = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

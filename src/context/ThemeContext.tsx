import { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { THEMES, ThemeContextProps, ThemeType } from '../utils/types';

export const ThemeContext = createContext<ThemeContextProps>({
  themeType: 'light',
  theme: THEMES.light,
  setCurrentTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');

  const value = useMemo(
    () => ({
      themeType: currentTheme,
      theme: THEMES[currentTheme],
      setCurrentTheme,
    }),
    [currentTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

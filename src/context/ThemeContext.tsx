import { createContext, useState, useContext, ReactNode, useMemo } from 'react';

export type ThemeType = 'dark' | 'light';
export enum Color {
  WHITE = '#fff',
  DARK_GRAY = '#242424',
  LIGHT_GRAY = '#EFEAE9',
  VIOLET = '#DCCAEE',
  DARK_VIOLET = '#49355B',
  YELLOW = '#FDF1D6',
  GREEN = '#2F4032',
}
export interface Theme {
  '--primary': Color;
  '--secondary': Color;
  '--background': Color;
  '--white': Color;
}
export const THEMES: Record<ThemeType, Theme> = {
  light: {
    '--primary': Color.DARK_VIOLET,
    '--secondary': Color.GREEN,
    '--background': Color.LIGHT_GRAY,
    '--white': Color.WHITE,
  },
  dark: {
    '--primary': Color.VIOLET,
    '--secondary': Color.YELLOW,
    '--background': Color.DARK_GRAY,
    '--white': Color.WHITE,
  },
};
export interface ThemeContextProps {
  currentTheme: ThemeType;
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: 'light',
  theme: THEMES.light,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const value = useMemo(
    () => ({
      currentTheme,
      theme: THEMES[currentTheme],
      toggleTheme,
    }),
    [currentTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

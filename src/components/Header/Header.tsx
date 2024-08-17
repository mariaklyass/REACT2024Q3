'use client';

import { useTheme } from 'src/context/ThemeContext';
import SearchBar from '../SearchBar/SearchBar';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default function Header() {
  const { theme, toggleTheme, currentTheme } = useTheme();

  return (
    <header style={{ ...(theme as React.CSSProperties) }}>
      <SearchBar />
      <ThemeSwitcher
        onChange={toggleTheme}
        isDarkMode={currentTheme === 'dark'}
      />
    </header>
  );
}

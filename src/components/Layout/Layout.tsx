import { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from '../SearchBar/SearchBar';
import Flyout from '../Flyout/Flyout';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, currentTheme, toggleTheme } = useTheme();
  const isDarkMode = currentTheme === 'dark';

  return (
    <div className="app" style={{ ...(theme as React.CSSProperties) }}>
      <ThemeSwitcher onChange={toggleTheme} isDarkMode={isDarkMode} />
      <SearchBar />
      {children}
      <Flyout />
    </div>
  );
}

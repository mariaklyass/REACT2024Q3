import { ReactNode } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Flyout from '../Flyout/Flyout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app">
      <SearchBar />
      {children}
      <Flyout />
    </div>
  );
}

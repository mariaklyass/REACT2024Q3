import { ReactNode } from 'react';
import SearchBar from '../SearchBar/SearchBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app">
      <SearchBar />
      {children}
    </div>
  );
}

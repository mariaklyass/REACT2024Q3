import SearchBar from '../SearchBar/SearchBar';

export default function Layout({ children }) {
  return (
    <div className="app">
      {/* context switch */}
      {/* search bar */}
      <SearchBar />
      {/* main list */}
      {children}
    </div>
  );
}

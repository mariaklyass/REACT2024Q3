import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import './SearchBar.css';
import { SearchBarProps } from '../utils/types';

function SearchBar({ handleSubmit }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchQuery');
    if (savedSearchTerm) {
      setSearchQuery(savedSearchTerm);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    handleSubmit(trimmedQuery);
  };

  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;

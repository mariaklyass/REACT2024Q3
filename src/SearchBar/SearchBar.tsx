import { ChangeEvent, FormEvent } from 'react';
import './SearchBar.css';
import { SearchBarProps } from '../utils/types';
import useLocalStorage from '../hooks/useLocalStorage';

function SearchBar({ handleSubmit }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    setSearchQuery(trimmedQuery);
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

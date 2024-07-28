import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { SearchBarProps } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { setSearchQuery } from '../../slices/homeSlice';

function SearchBar({ handleSubmit }: SearchBarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.home.searchQuery);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = localQuery.trim();
    dispatch(setSearchQuery(trimmedQuery));
    handleSubmit(trimmedQuery);

    const params = new URLSearchParams();
    if (trimmedQuery) {
      params.set('query', trimmedQuery);
    }
    params.set('page', '1');
    navigate({ search: params.toString() });
  };

  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={localQuery}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;

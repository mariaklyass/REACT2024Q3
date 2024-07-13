import { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import CharacterList from './CharacterList/CharacterList';
import Loader from './UtilityComponents/Loader';
import fetchCharacterData from './utils/api';
import { Character } from './utils/types';
import useLocalStorage from './hooks/useLocalStorage';

function Home() {
  const [results, setResults] = useState<Character[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  const fetchCharacters = (query: string) => {
    setLoading(true);
    fetchCharacterData(query)
      .then(res => {
        setResults(res);
        setError(null);
      })
      .catch(err => {
        if (err instanceof Error) {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleFetchResults = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchCharacters(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <SearchBar handleSubmit={handleFetchResults} />
      {loading ? <Loader /> : <CharacterList results={results} error={error} />}
    </div>
  );
}

export default Home;

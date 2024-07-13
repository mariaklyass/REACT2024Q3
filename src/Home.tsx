import { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import CharacterList from './CharacterList/CharacterList';
import Loader from './UtilityComponents/Loader';
import fetchCharacterData from './utils/api';
import { Character } from './utils/types';

function Home() {
  const [results, setResults] = useState<Character[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCharacters = (searchQuery: string) => {
    setLoading(true);
    fetchCharacterData(searchQuery)
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

  const fetchCharactersFromStorage = () => {
    const searchQuery = localStorage.getItem('searchQuery') || '';
    fetchCharacters(searchQuery);
  };

  const handleFetchResults = (searchQuery: string) => {
    localStorage.setItem('searchQuery', searchQuery);
    fetchCharacters(searchQuery);
  };

  useEffect(() => {
    fetchCharactersFromStorage();
  }, []);

  return (
    <div>
      <SearchBar handleSubmit={handleFetchResults} />
      {loading ? <Loader /> : <CharacterList results={results} error={error} />}
    </div>
  );
}

export default Home;

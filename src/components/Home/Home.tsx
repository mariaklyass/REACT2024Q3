import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import CharacterList from '../CharacterList/CharacterList';
import Loader from '../UtilityComponents/Loader';
import Pagination from '../UtilityComponents/Pagination';
import { fetchCharacterData } from '../../utils/api';
import { Character } from '../../utils/types';
import useLocalStorage from '../../hooks/useLocalStorage';

function Home() {
  const [results, setResults] = useState<Character[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  const [totalPages, setTotalPages] = useState<number>(1);
  const location = useLocation();
  const navigate = useNavigate();

  const getPageFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get('frontpage') || '1', 10);
  };
  const [currentPage, setCurrentPage] = useState<number>(getPageFromQuery());

  const fetchCharacters = (query: string, page: number) => {
    setLoading(true);
    fetchCharacterData(query, page)
      .then(res => {
        setResults(res.results);
        setTotalPages(res.totalPages);
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
    setCurrentPage(1);
  };

  useEffect(() => {
    const page = getPageFromQuery();
    fetchCharacters(searchQuery, page);
  }, [searchQuery, location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('frontpage', currentPage.toString());
    navigate({ search: params.toString() });
  }, [currentPage, navigate, location.search]);

  return (
    <div className="main-page">
      <SearchBar handleSubmit={handleFetchResults} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>All Characters</h1>
          <CharacterList
            results={results}
            error={error}
            currentPage={currentPage}
          />
        </>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Home;

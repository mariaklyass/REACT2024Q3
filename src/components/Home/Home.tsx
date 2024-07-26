import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import CharacterList from '../CharacterList/CharacterList';
import Loader from '../UtilityComponents/Loader';
import Pagination from '../UtilityComponents/Pagination';
import { useFetchCharactersQuery } from '../../slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { setSearchQuery, setCurrentPage } from '../../slices/homeSlice';

function Home() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = useAppSelector(state => state.home.searchQuery);
  const currentPage = useAppSelector(state => state.home.currentPage);

  const getPageFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get('page') || '1', 10);
  };

  const { data, error, isLoading } = useFetchCharactersQuery({
    name: searchQuery,
    page: currentPage,
  });

  const handleFetchResults = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    const page = getPageFromQuery();
    dispatch(setCurrentPage(page));
  }, [location.search, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('page', currentPage.toString());
    navigate({ search: params.toString() });
  }, [currentPage, navigate, location.search]);

  return (
    <div className="main-page">
      <SearchBar handleSubmit={handleFetchResults} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>All Characters</h1>
          <CharacterList
            results={data?.results || []}
            error={error ?? null}
            currentPage={currentPage}
          />
        </>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.info?.pages || 1}
        setCurrentPage={page => dispatch(setCurrentPage(page))}
      />
    </div>
  );
}

export default Home;

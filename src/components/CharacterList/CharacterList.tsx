import { Link } from 'react-router-dom';
import CharacterCard from '../CharacterCard/CharacterCard';
import { CharacterListProps } from '../../utils/types';
import './CharacterList.css';

function CharacterList({ results, error, currentPage }: CharacterListProps) {
  if (error || results.length === 0) {
    return (
      <div className="results-error" data-testid="error-message">
        There aren&apos;t any characters. <br />
        Would you mind trying to search for something else or refresh the page?
      </div>
    );
  }

  const searchResults = results.map(result => (
    <div key={result.id}>
      <Link to={`/?frontpage=${currentPage}&details=${result.id}`}>
        <CharacterCard character={result} />
      </Link>
    </div>
  ));

  return <div className="results">{searchResults}</div>;
}

export default CharacterList;

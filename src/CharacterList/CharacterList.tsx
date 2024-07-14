import { Link } from 'react-router-dom';
import CharacterCard from '../CharacterCard/CharacterCard';
import { CharacterListProps } from '../utils/types';
import './CharacterList.css';

function CharacterList({ results, error, currentPage }: CharacterListProps) {
  if (error || results.length === 0) {
    return (
      <div className="results-error">
        There isn&apos;t a character with that name. <br />
        Would you mind trying something else?
      </div>
    );
  }

  const searchResults = results.map(result => (
    <div key={result.id}>
      <Link to={`/?frontpage=${currentPage}&details=${result.id}`}>
        <CharacterCard character={result} currentPage={currentPage} />
      </Link>
    </div>
  ));

  return <div className="results">{searchResults}</div>;
}

export default CharacterList;

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { selectCharacter, unselectCharacter } from '../../slices/selectedSlice';
import CharacterCard from '../CharacterCard/CharacterCard';
import { Character, CharacterListProps } from '../../utils/types';
import './CharacterList.css';

function CharacterList({ results, error, currentPage }: CharacterListProps) {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    state => state.selected.selectedCharacters
  );
  const isSelected = (character: Character) =>
    selectedCharacters.some(selected => selected.id === character.id);
  const toggleCheckbox = (character: Character) => {
    if (isSelected(character)) {
      dispatch(unselectCharacter(character.id));
    } else {
      dispatch(selectCharacter(character));
    }
  };

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
      <input
        type="checkbox"
        checked={isSelected(result)}
        onChange={() => toggleCheckbox(result)}
      />
      <Link to={`/?frontpage=${currentPage}&details=${result.id}`}>
        <CharacterCard character={result} />
      </Link>
    </div>
  ));

  return <div className="results">{searchResults}</div>;
}

export default CharacterList;

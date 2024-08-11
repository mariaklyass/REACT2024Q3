import React from 'react';
import { Character } from 'src/lib/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCharacter, unselectCharacter } from '../../store/selectedSlice';
import CharacterCard from '../CharacterCard/CharacterCard';

interface CharactersListProps {
  characters: Character[];
  onCharacterClick: (id: string) => void;
}

function CharactersList({
  characters,
  onCharacterClick,
}: CharactersListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    state => state.selected.selectedCharacters
  );
  const isSelected = (id: string) =>
    selectedCharacters.some(character => character.id === id);
  const toggleCheckbox = (character: Character) => {
    if (isSelected(character.id)) {
      dispatch(unselectCharacter(character.id));
    } else {
      dispatch(selectCharacter(character));
    }
  };

  return (
    <ul className="characters">
      {characters.map(character => (
        <div key={character.id}>
          <input
            className="checkbox"
            type="checkbox"
            checked={isSelected(character.id)}
            onChange={() => toggleCheckbox(character)}
          />
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
            onClick={onCharacterClick}
          />
        </div>
      ))}
    </ul>
  );
}

export default CharactersList;

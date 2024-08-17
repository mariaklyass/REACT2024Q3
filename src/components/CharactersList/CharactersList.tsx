'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Character } from '../../lib/types';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCharacter, unselectCharacter } from '../../store/selectedSlice';

interface CharactersListProps {
  characters: Character[];
}

function CharactersList({ characters }: CharactersListProps): JSX.Element {
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
  const router = useRouter();
  const handleCharacterClick = (id: string) => {
    router.push(`/?details=${id}`);
  };
  const { theme } = useTheme();

  return (
    <ul className="characters" style={{ ...(theme as React.CSSProperties) }}>
      {characters.map(character => (
        <div key={character.id} className="card">
          <input
            className="checkbox"
            type="checkbox"
            checked={isSelected(character.id)}
            onChange={() => toggleCheckbox(character)}
          />

          <button
            type="button"
            onClick={() => handleCharacterClick(character.id)}
          >
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
          </button>
        </div>
      ))}
    </ul>
  );
}

export default CharactersList;

import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';

interface CharactersListProps {
  characters: Array<{
    id: string;
    name: string;
    image: string;
  }>;
  onCharacterClick: (id: string) => void;
}

function CharactersList({
  characters,
  onCharacterClick,
}: CharactersListProps): JSX.Element {
  return (
    <ul className="characters">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          image={character.image}
          onClick={onCharacterClick}
        />
      ))}
    </ul>
  );
}

export default CharactersList;

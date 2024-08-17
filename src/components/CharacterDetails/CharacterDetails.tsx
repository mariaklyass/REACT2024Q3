'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CharacterDetailsProps } from '../../lib/types';
import { useTheme } from '../../context/ThemeContext';

function CharacterDetails({ character }: CharacterDetailsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    router.push(`/?${params.toString()}`);
  };
  const { theme } = useTheme();
  if (!character) {
    return null;
  }

  return (
    <div className="details" style={{ ...(theme as React.CSSProperties) }}>
      <div className="details-card">
        <button type="button" onClick={handleClose} className="close-button">
          Close
        </button>
        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} />
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin?.name}</p>
        <p>Location: {character.location?.name}</p>
      </div>
    </div>
  );
}

export default CharacterDetails;

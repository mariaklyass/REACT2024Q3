import React from 'react';

interface CharacterCardProps {
  id: string;
  name: string;
  image: string;
  onClick: (id: string) => void;
}

function CharacterCard({
  id,
  name,
  image,
  onClick,
}: CharacterCardProps): JSX.Element {
  return (
    <li className="card">
      <img src={image} alt={name} />
      {name}
      <button type="button" onClick={() => onClick(id)}>
        Details
      </button>
    </li>
  );
}

export default CharacterCard;

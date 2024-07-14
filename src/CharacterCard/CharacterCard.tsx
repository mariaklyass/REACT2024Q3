import './CharacterCard.css';
import { CharacterCardProps } from '../utils/types';

function CharacterCard({ character }: CharacterCardProps) {
  const { name, status, species, image } = character;

  return (
    <div className="card" data-testid="card-element">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>
        {status} - {species}
      </p>
    </div>
  );
}

export default CharacterCard;

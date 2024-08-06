import { useRouter } from 'next/router';
import { CharacterDetailsProps } from 'src/lib/types';

function CharacterDetails({ character }: CharacterDetailsProps) {
  const router = useRouter();
  const { page, search } = router.query;

  if (!character) {
    return null;
  }

  const handleClose = () => {
    const query = { page, ...(search && { search }) };
    router.push({ pathname: '/', query }).catch(error => {
      console.error('Failed to navigate:', error);
    });
  };

  return (
    <div className="details">
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

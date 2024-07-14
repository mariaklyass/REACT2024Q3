import { useLocation, useNavigate } from 'react-router-dom';
import './CharacterCardDetails.css';
import { useState, useEffect } from 'react';
import { Character } from '../utils/types';
import Loader from '../UtilityComponents/Loader';
import { fetchCharacterDataById } from '../utils/api';
import FallbackUI from '../UtilityComponents/FallbackUI';

function CharacterCardDetails() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('details');

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchCharacterDataById(id)
        .then(data => {
          setCharacter(data);
        })
        .catch(error => {
          console.error(error);
          <FallbackUI />;
        })
        .finally(() => setLoading(false));
    } else {
      setCharacter(null);
    }
  }, [id]);

  const handleClose = () => {
    searchParams.delete('details');
    navigate({ search: searchParams.toString() });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {character ? (
        <>
          <button type="button" onClick={handleClose}>
            Close
          </button>
          <h1>{character.name}</h1>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <img src={character.image} alt={character.name} />
        </>
      ) : (
        <div />
      )}
    </div>
  );
}

export default CharacterCardDetails;
